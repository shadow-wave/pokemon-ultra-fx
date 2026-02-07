import React, { useState, useEffect, useCallback } from 'react';
import { BattleView } from './components/BattleView';
import { HubView } from './components/HubView';
import { StartScreen } from './components/StartScreen';
import { PvpLobby } from './components/PvpLobby';
import { EvolutionScene } from './components/EvolutionScene';
import { Pokemon, PlayerState, createPokemon, gainExperience, evolvePokemon } from './utils/gameLogic';
import { POKEMON_DB } from './constants';
import { DataConnection } from 'peerjs';
import * as Tone from 'tone';

const SAVE_KEY = 'poke_ultra_v33';

export default function App() {
  const [view, setView] = useState<'start' | 'hub' | 'battle' | 'team_select' | 'lobby' | 'evolution'>('start');
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [battleMode, setBattleMode] = useState<'ai' | 'online'>('ai');
  const [selectedParty, setSelectedParty] = useState<Pokemon[]>([]);
  
  // Evolution State
  const [evoData, setEvoData] = useState<{ old: Pokemon, new: Pokemon, index: number } | null>(null);

  // PVP State
  const [peerConn, setPeerConn] = useState<DataConnection | null>(null);
  const [enemyParty, setEnemyParty] = useState<Pokemon[]>([]);

  // Sound Engine Init
  const initAudio = useCallback(() => {
    if (Tone.context.state !== 'running') {
      Tone.start();
    }
  }, []);

  const loadGame = () => {
    initAudio();
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: Init new balls if missing
      if (parsed.bag && parsed.bag.pokeBalls === undefined) {
          parsed.bag = {
              potions: parsed.bag.potions || 0,
              pokeBalls: parsed.bag.balls || 0,
              greatBalls: 0,
              ultraBalls: 0,
              masterBalls: 0
          };
      }
      setPlayerState(parsed);
      setView('hub');
    }
  };

  const startNewGame = (name: string) => {
    initAudio();
    const starters = [
      createPokemon('Bulbasaur', 5),
      createPokemon('Charmander', 5),
      createPokemon('Squirtle', 5),
    ];
    const newState: PlayerState = {
      name,
      wins: 0,
      team: starters,
      box: [],
      bag: { potions: 5, pokeBalls: 10, greatBalls: 0, ultraBalls: 0, masterBalls: 0 }
    };
    setPlayerState(newState);
    saveGame(newState);
    setView('hub');
  };

  const saveGame = (state: PlayerState) => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  };

  const handleBattleEnd = (winner: 'p1' | 'p2' | 'ai', earnedRewards: boolean, participatedIds: string[], finalParty: Pokemon[]) => {
    if (peerConn) {
        peerConn.close();
        setPeerConn(null);
    }

    if (!playerState) return;
    
    // Sync HP/Status from battle back to main roster
    const newState = { ...playerState };
    
    // Update team members that were in the battle
    finalParty.forEach(battleMon => {
        const index = newState.team.findIndex(p => p.uuid === battleMon.uuid);
        if (index !== -1) {
            // Preserve non-battle props, update battle props
            newState.team[index] = { ...newState.team[index], hp: battleMon.hp, status: battleMon.status, stages: battleMon.stages };
        }
    });

    if (winner === 'p1' && earnedRewards) {
      newState.wins += 1;
      // Base rewards
      newState.bag.pokeBalls += 1;
      newState.bag.potions += 1;

      // Lucky Drops (Rare Balls)
      const roll = Math.random();
      if (roll < 0.3) {
          newState.bag.greatBalls += 1;
      }
      if (roll < 0.1) {
          newState.bag.ultraBalls += 1;
      }
      // Very rare drop
      if (roll < 0.01) {
          newState.bag.masterBalls += 1;
      }
      
      // XP Logic: Split total XP among participants
      // Calculate Total XP based on enemy level (assuming 1 enemy for now)
      // Base XP formula: (EnemyLevel * 40) roughly
      const enemyLevel = enemyParty[0]?.lvl || 10;
      const totalXpYield = Math.floor(enemyLevel * 40 + 50);
      
      // Filter participants who are actually in the team (sanity check)
      const validParticipants = participatedIds.filter(id => newState.team.some(p => p.uuid === id));
      
      if (validParticipants.length > 0) {
          const xpPerMon = Math.floor(totalXpYield / validParticipants.length);
          
          let pendingEvo = null;

          validParticipants.forEach(id => {
              const rosterIndex = newState.team.findIndex(p => p.uuid === id);
              if (rosterIndex !== -1 && newState.team[rosterIndex].hp > 0) {
                   const result = gainExperience(newState.team[rosterIndex], xpPerMon);
                   newState.team[rosterIndex] = result.p;

                   if (result.leveledUp) {
                       // Full heal on level up
                       newState.team[rosterIndex].hp = newState.team[rosterIndex].maxHp;
                   }

                   if (result.readyToEvolve && !pendingEvo) {
                       const oldMon = { ...newState.team[rosterIndex] };
                       const newMon = evolvePokemon(oldMon);
                       if (newMon.name !== oldMon.name) {
                           pendingEvo = { old: oldMon, new: newMon, index: rosterIndex };
                       }
                   }
              }
          });

          if (pendingEvo) {
              setEvoData(pendingEvo);
              setPlayerState(newState);
              saveGame(newState);
              setView('evolution');
              return;
          }
      }
    }

    setPlayerState(newState);
    saveGame(newState);
    setView('hub');
  };

  const handleEvolutionComplete = () => {
      if (!playerState || !evoData) return;
      const newState = { ...playerState };
      newState.team[evoData.index] = evoData.new;
      setPlayerState(newState);
      saveGame(newState);
      setEvoData(null);
      setView('hub');
  };

  const handleHealAll = () => {
    if (!playerState) return;
    const newState = { ...playerState };
    newState.team.forEach(p => {
      p.hp = p.maxHp;
      p.status = null;
      p.stages = { atk: 0, def: 0, spAtk: 0, spDef: 0, spd: 0, acc: 0, eva: 0 };
    });
    setPlayerState(newState);
    saveGame(newState);
  };

  const handleCatch = (newMon: Pokemon, ballType: keyof PlayerState['bag']) => {
    if (!playerState) return;
    const newState = { ...playerState };
    if (newState.team.length < 6) {
        newState.team.push(newMon);
    } else {
        newState.box.push(newMon);
    }
    newState.bag[ballType] = Math.max(0, newState.bag[ballType] - 1);
    setPlayerState(newState);
    saveGame(newState);
  };

  // --- Start Adventure (AI) ---
  const startAdventure = (party: Pokemon[]) => {
      if (!playerState) return;
      setSelectedParty(party);

      // Scaling Logic
      const avgLevel = Math.floor(party.reduce((sum, p) => sum + p.lvl, 0) / party.length);
      const isBoss = (playerState.wins + 1) % 3 === 0;
      
      let enemyPool: string[] = [];
      let enemyLevel = avgLevel;

      if (isBoss) {
          enemyPool = ['Mewtwo', 'Rayquaza', 'Arceus', 'Lugia', 'Ho-Oh', 'Dragonite'];
          enemyLevel = avgLevel + 5; // Boss is stronger
      } else {
          // Standard Pool (exclude boss legends)
          enemyPool = Object.keys(POKEMON_DB).filter(k => !POKEMON_DB[k].isLegend && POKEMON_DB[k].evolution?.level !== 16); // Try to get evolved forms or basics
      }

      const randomEnemy = enemyPool[Math.floor(Math.random() * enemyPool.length)];
      const enemyMon = createPokemon(randomEnemy, enemyLevel);
      setEnemyParty([enemyMon]);
      
      setBattleMode('ai');
      setView('battle');
  };

  // --- PVP Handlers ---
  const handlePvpConnect = (conn: DataConnection) => {
    setPeerConn(conn);
    setBattleMode('online');
    setView('team_select');
  };

  const startPvpBattle = (party: Pokemon[]) => {
    if (!peerConn) return;
    setSelectedParty(party);
    peerConn.send({ type: 'HANDSHAKE', team: party });
    peerConn.once('data', (data: any) => {
        if (data.type === 'HANDSHAKE') {
            setEnemyParty(data.team);
            setView('battle');
        }
    });
  };

  // Render
  return (
    <div className="w-full h-full text-white overflow-hidden">
      {view === 'start' && (
        <StartScreen onContinue={loadGame} onNewGame={startNewGame} hasSave={!!localStorage.getItem(SAVE_KEY)} />
      )}
      
      {view === 'hub' && playerState && (
        <HubView 
            player={playerState} 
            onHeal={handleHealAll}
            onBattle={(mode) => {
                if (mode === 'online') {
                    setView('lobby');
                } else {
                    setView('team_select');
                }
            }}
        />
      )}

      {view === 'evolution' && evoData && (
          <EvolutionScene 
            oldMon={evoData.old} 
            newMon={evoData.new} 
            onComplete={handleEvolutionComplete} 
          />
      )}

      {view === 'lobby' && (
        <PvpLobby 
            onConnect={handlePvpConnect}
            onBack={() => setView('hub')}
        />
      )}

      {view === 'team_select' && playerState && (
        <TeamSelect 
            roster={[...playerState.team]} 
            onConfirm={(party) => {
                if (battleMode === 'online') {
                    startPvpBattle(party);
                } else {
                    startAdventure(party);
                }
            }} 
            onBack={() => setView(battleMode === 'online' ? 'lobby' : 'hub')}
        />
      )}

      {view === 'battle' && playerState && (
        <BattleView 
            playerParty={selectedParty}
            enemyParty={enemyParty}
            mode={battleMode}
            onBattleEnd={handleBattleEnd}
            onCatch={handleCatch}
            inventory={playerState.bag}
            peerConn={peerConn}
        />
      )}
    </div>
  );
}

// Sub-component for Team Selection
const TeamSelect = ({ roster, onConfirm, onBack }: { roster: Pokemon[], onConfirm: (p: Pokemon[]) => void, onBack: () => void }) => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (uuid: string) => {
        if (selected.includes(uuid)) setSelected(selected.filter(id => id !== uuid));
        else if (selected.length < 3) setSelected([...selected, uuid]);
    };

    const confirm = () => {
        const party = selected.map(id => roster.find(p => p.uuid === id)!).filter(Boolean);
        if (party.length === 0) return alert("Select at least 1 Pokémon!");
        if (party.every(p => p.hp <= 0)) return alert("Select at least 1 healthy Pokémon!");
        onConfirm(party);
    };

    return (
        <div className="flex flex-col items-center p-6 h-full max-w-2xl mx-auto bg-slate-900">
            <h2 className="text-2xl text-yellow-400 font-bold mb-4 uppercase">Select Party</h2>
            <div className="flex-1 w-full overflow-y-auto space-y-2 mb-4">
                {roster.map(p => {
                    const isSelected = selected.includes(p.uuid);
                    return (
                        <div 
                            key={p.uuid} 
                            onClick={() => toggle(p.uuid)}
                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? 'border-yellow-400 bg-slate-800' : 'border-slate-600 bg-slate-700 opacity-80'}`}
                        >
                            <img src={p.sprites.front} className="w-12 h-12 pixel-art" />
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between">
                                    <span className="font-bold text-sm">{p.name}</span>
                                    <span className="text-xs">Lv{p.lvl}</span>
                                </div>
                                <div className="w-full bg-slate-900 h-2 mt-1 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${p.hp < p.maxHp * 0.2 ? 'bg-red-500' : p.hp < p.maxHp * 0.5 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                                        style={{ width: `${(p.hp / p.maxHp) * 100}%` }}
                                    ></div>
                                </div>
                                <p className="text-[10px] text-right mt-1">{p.hp}/{p.maxHp} HP</p>
                            </div>
                            {isSelected && <div className="w-4 h-4 rounded-full bg-yellow-400 ml-2 animate-pulse"></div>}
                        </div>
                    );
                })}
            </div>
            <div className="flex w-full gap-2">
                <button onClick={onBack} className="flex-1 py-4 bg-slate-600 rounded-xl font-bold border-b-4 border-slate-800 active:border-b-0 active:translate-y-1">BACK</button>
                <button 
                    onClick={confirm} 
                    disabled={selected.length === 0}
                    className={`flex-1 py-4 rounded-xl font-bold border-b-4 active:border-b-0 active:translate-y-1 ${selected.length > 0 ? 'bg-green-600 border-green-800 text-white' : 'bg-slate-700 border-slate-900 text-slate-500'}`}
                >
                    CONFIRM ({selected.length}/3)
                </button>
            </div>
        </div>
    );
};