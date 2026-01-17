import React, { useState } from 'react';
import { PlayerStats, TopicStats } from '../types';
import {
    clearMissedQuestions,
    deleteTopic,
    formatTime,
    formatDate,
    clearStats
} from '../services/statsService';
import {
    TrashIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ExclamationTriangleIcon,
    XMarkIcon
} from '@heroicons/react/24/solid';

interface StatsPanelProps {
    stats: PlayerStats;
    onStatsChange: (stats: PlayerStats) => void;
    onClose: () => void;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, onStatsChange, onClose }) => {
    const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    const winRate = stats.totalGamesPlayed > 0
        ? Math.round((stats.totalGamesWon / stats.totalGamesPlayed) * 100)
        : 0;

    const turnAccuracy = (stats.totalTurnsWon + stats.totalTurnsLost) > 0
        ? Math.round((stats.totalTurnsWon / (stats.totalTurnsWon + stats.totalTurnsLost)) * 100)
        : 0;

    const handleClearMissed = (topicName: string) => {
        const newStats = clearMissedQuestions(topicName);
        onStatsChange(newStats);
    };

    const handleDeleteTopic = (topicName: string) => {
        const newStats = deleteTopic(topicName);
        onStatsChange(newStats);
        setExpandedTopic(null);
    };

    const handleClearAll = () => {
        clearStats();
        onStatsChange({
            totalGamesPlayed: 0,
            totalGamesWon: 0,
            totalGamesLost: 0,
            totalTurnsWon: 0,
            totalTurnsLost: 0,
            totalTimePlayedMs: 0,
            longestStreak: 0,
            topics: []
        });
        setShowClearConfirm(false);
    };

    const getTopicAccuracy = (topic: TopicStats) => {
        const total = topic.turnsWon + topic.turnsLost;
        return total > 0 ? Math.round((topic.turnsWon / total) * 100) : 0;
    };

    return (
        <div className="space-y-6 animate-fadeIn mt-6 bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] ring-1 ring-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-black text-white uppercase tracking-wide">Player Stats</h3>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white shadow-lg">
                    <div className="text-3xl font-black">{stats.totalGamesPlayed}</div>
                    <div className="text-xs font-bold opacity-80 uppercase tracking-wide">Games Played</div>
                </div>
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-4 text-white shadow-lg">
                    <div className="text-3xl font-black">{winRate}%</div>
                    <div className="text-xs font-bold opacity-80 uppercase tracking-wide">Win Rate</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white shadow-lg">
                    <div className="text-3xl font-black">{stats.longestStreak}</div>
                    <div className="text-xs font-bold opacity-80 uppercase tracking-wide">Best Streak</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
                    <div className="text-3xl font-black">{formatTime(stats.totalTimePlayedMs)}</div>
                    <div className="text-xs font-bold opacity-80 uppercase tracking-wide">Time Played</div>
                </div>
            </div>

            {/* Detailed Stats */}
            <div className="bg-white/5 rounded-2xl p-4 space-y-2 border border-white/10">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white/50">Questions Answered</span>
                    <span className="text-sm font-black text-white">{stats.totalTurnsWon + stats.totalTurnsLost}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white/50">Correct Answers</span>
                    <span className="text-sm font-black text-emerald-400">{stats.totalTurnsWon}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white/50">Wrong Answers</span>
                    <span className="text-sm font-black text-rose-400">{stats.totalTurnsLost}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white/50">Accuracy</span>
                    <span className="text-sm font-black text-sky-400">{turnAccuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white/50">Games Won</span>
                    <span className="text-sm font-black text-emerald-400">{stats.totalGamesWon}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-white/50">Games Lost</span>
                    <span className="text-sm font-black text-rose-400">{stats.totalGamesLost}</span>
                </div>
            </div>

            {/* Topics Section */}
            {stats.topics.length > 0 && (
                <div>
                    <h4 className="text-xs font-black text-white/40 uppercase tracking-widest mb-3">Topics Studied ({stats.topics.length})</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {stats.topics.map((topic) => (
                            <div key={topic.topicName} className="bg-white/5 rounded-xl overflow-hidden border border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setExpandedTopic(expandedTopic === topic.topicName ? null : topic.topicName)}
                                    className="w-full p-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                                >
                                    <div className="flex-1 text-left">
                                        <div className="font-bold text-white text-sm truncate max-w-[200px]">
                                            {topic.topicName.length > 30 ? topic.topicName.substring(0, 30) + '...' : topic.topicName}
                                        </div>
                                        <div className="text-[10px] text-white/40 font-bold">
                                            {topic.gamesPlayed} games • {getTopicAccuracy(topic)}% accuracy
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {topic.missedQuestions.length > 0 && (
                                            <span className="bg-rose-500/20 text-rose-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-rose-500/20">
                                                {topic.missedQuestions.length} to review
                                            </span>
                                        )}
                                        {expandedTopic === topic.topicName ? (
                                            <ChevronUpIcon className="w-4 h-4 text-white/40" />
                                        ) : (
                                            <ChevronDownIcon className="w-4 h-4 text-white/40" />
                                        )}
                                    </div>
                                </button>

                                {expandedTopic === topic.topicName && (
                                    <div className="px-3 pb-3 space-y-3 border-t border-white/10 bg-black/20">
                                        {/* Topic Details */}
                                        <div className="grid grid-cols-2 gap-2 pt-3">
                                            <div className="text-[10px]">
                                                <span className="text-white/40 font-bold">First played:</span>
                                                <span className="text-white/80 font-bold ml-1">{formatDate(topic.firstPlayed)}</span>
                                            </div>
                                            <div className="text-[10px]">
                                                <span className="text-white/40 font-bold">Last played:</span>
                                                <span className="text-white/80 font-bold ml-1">{formatDate(topic.lastPlayed)}</span>
                                            </div>
                                            <div className="text-[10px]">
                                                <span className="text-white/40 font-bold">Time spent:</span>
                                                <span className="text-white/80 font-bold ml-1">{formatTime(topic.totalTimeMs)}</span>
                                            </div>
                                            <div className="text-[10px]">
                                                <span className="text-white/40 font-bold">Correct/Wrong:</span>
                                                <span className="text-emerald-400 font-bold ml-1">{topic.turnsWon}</span>
                                                <span className="text-white/40 font-bold">/</span>
                                                <span className="text-rose-400 font-bold">{topic.turnsLost}</span>
                                            </div>
                                        </div>

                                        {/* Missed Questions */}
                                        {topic.missedQuestions.length > 0 && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-rose-400 uppercase">Questions to Review</span>
                                                    <button
                                                        onClick={() => handleClearMissed(topic.topicName)}
                                                        className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300"
                                                    >
                                                        <CheckCircleIcon className="w-3 h-3" />
                                                        Clear All
                                                    </button>
                                                </div>
                                                <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                                                    {topic.missedQuestions.slice(-5).map((q, idx) => (
                                                        <div key={idx} className="bg-black/40 rounded-lg p-2 text-[10px] border border-white/5">
                                                            <div className="font-bold text-white/90 mb-1">{q.question}</div>
                                                            <div className="flex gap-2">
                                                                <span className="text-rose-400">Your answer: {q.playerAnswer}</span>
                                                                <span className="text-emerald-400">Correct: {q.correctAnswer}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Delete Topic */}
                                        <button
                                            onClick={() => handleDeleteTopic(topic.topicName)}
                                            className="w-full flex items-center justify-center gap-1 text-[10px] font-bold text-rose-400 hover:text-rose-300 py-1"
                                        >
                                            <TrashIcon className="w-3 h-3" />
                                            Delete Topic Data
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No Stats Yet */}
            {stats.totalGamesPlayed === 0 && (
                <div className="text-center py-8">
                    <div className="text-4xl mb-2 opacity-50">🎮</div>
                    <div className="text-white/60 font-bold text-sm">No games played yet!</div>
                    <div className="text-white/40 text-xs">Start a battle to track your progress</div>
                </div>
            )}

            {/* Clear All Data */}
            {stats.totalGamesPlayed > 0 && (
                <div className="pt-2">
                    {showClearConfirm ? (
                        <div className="bg-red-50 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-2 text-red-600">
                                <ExclamationTriangleIcon className="w-5 h-5" />
                                <span className="font-bold text-sm">Delete all stats?</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleClearAll}
                                    className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs transition-all"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-xl font-bold text-xs transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowClearConfirm(true)}
                            className="w-full py-2 text-red-400 hover:text-red-500 font-bold text-xs transition-colors"
                        >
                            Clear All Stats
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
