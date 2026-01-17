import React from 'react';
import { Quest } from '../types';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Trophy, CheckCircle, Target, Flame, Zap } from 'lucide-react';

interface QuestsModalProps {
    quests: Quest[];
    onClose: () => void;
}

export const QuestsModal: React.FC<QuestsModalProps> = ({ quests, onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-slate-900/90 border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp">

                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-500/30">
                            <Trophy className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-wide">Daily Quests</h2>
                            <p className="text-xs text-indigo-300 font-bold">Complete tasks to earn XP!</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Quests List */}
                <div className="p-6 space-y-4">
                    {quests.length === 0 ? (
                        <div className="text-center py-8 text-white/30">
                            <Zap className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="text-sm font-bold uppercase tracking-widest">No active quests</p>
                        </div>
                    ) : (
                        quests.map((quest) => {
                            const Icon = quest.type === 'STREAK' ? Flame : quest.type === 'TOPIC_ACCURACY' ? Target : CheckCircle;
                            const percent = Math.min(100, Math.round((quest.progress / quest.target) * 100));

                            return (
                                <div
                                    key={quest.id}
                                    className={`relative p-4 rounded-2xl border transition-all group ${quest.isCompleted
                                            ? 'bg-emerald-500/10 border-emerald-500/30'
                                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                        }`}
                                >
                                    <div className="flex items-start gap-4 relative z-10">
                                        <div className={`p-3 rounded-xl ${quest.isCompleted ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-black/40 text-white/70'
                                            }`}>
                                            <Icon className="w-6 h-6" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className={`font-bold text-sm truncate pr-2 ${quest.isCompleted ? 'text-emerald-400' : 'text-white'}`}>
                                                    {quest.description}
                                                </h3>
                                                <span className="text-[10px] font-black bg-white/10 text-yellow-400 px-2 py-0.5 rounded-full border border-white/5">
                                                    +{quest.rewardXp} XP
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mt-2">
                                                <div className="flex justify-between text-[10px] font-bold text-white/40 mb-1">
                                                    <span>PROGRESS</span>
                                                    <span className={quest.isCompleted ? 'text-emerald-400' : ''}>
                                                        {quest.progress} / {quest.target}
                                                    </span>
                                                </div>
                                                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                                                    <div
                                                        className={`h-full transition-all duration-500 ${quest.isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                                                            }`}
                                                        style={{ width: `${percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Glass Shine */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};
