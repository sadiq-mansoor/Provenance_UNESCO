import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, Star } from 'lucide-react';

// Helper functions
const getRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2:
      return <Medal className="h-6 w-6 text-gray-400" />;
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />;
    default:
      return <Star className="h-6 w-6 text-gray-300" />;
  }
};

const getRankColor = (rank) => {
  switch (rank) {
    case 1:
      return 'from-yellow-400 to-yellow-600';
    case 2:
      return 'from-gray-300 to-gray-500';
    case 3:
      return 'from-amber-400 to-amber-600';
    default:
      return 'from-gray-200 to-gray-300';
  }
};

const getBadgeColor = (badge) => {
  const colors = {
    'First Steps': 'bg-blue-100 text-blue-800',
    'Metadata Detective': 'bg-purple-100 text-purple-800',
    'Fake-Spotter Pro': 'bg-green-100 text-green-800',
    'Provenance Master': 'bg-red-100 text-red-800',
  };
  return colors[badge] || 'bg-gray-100 text-gray-800';
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:8000/leaderboard');
      const data = await response.json();
      setLeaderboard(data.leaderboard);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        <p className="text-gray-600">
          Top media literacy champions and their achievements
        </p>
      </motion.div>

      {leaderboard.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center"
        >
          <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No scores yet!</h3>
          <p className="text-gray-600">
            Be the first to complete a quiz and claim the top spot.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {/* Top 3 Podium */}
          {leaderboard.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {/* Second Place */}
              <PodiumCard player={leaderboard[1]} rank={2} />
              
              {/* First Place */}
              <PodiumCard player={leaderboard[0]} rank={1} isWinner />
              
              {/* Third Place */}
              <PodiumCard player={leaderboard[2]} rank={3} />
            </motion.div>
          )}

          {/* Full Leaderboard */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-blue-600" />
              <span>Full Rankings</span>
            </h2>
            
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <motion.div
                  key={player.username}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center justify-between p-4 rounded-lg border
                    ${player.rank <= 3 
                      ? 'bg-gradient-to-r ' + getRankColor(player.rank) + ' text-white border-transparent' 
                      : 'bg-gray-50 border-gray-200'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(player.rank)}
                      <span className={`text-2xl font-bold ${player.rank > 3 ? 'text-gray-600' : ''}`}>
                        #{player.rank}
                      </span>
                    </div>
                    
                    <div>
                      <p className={`font-semibold ${player.rank > 3 ? 'text-gray-900' : ''}`}>
                        {player.username}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {player.badges.map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${player.rank > 3 ? getBadgeColor(badge) : 'bg-white bg-opacity-20 text-white'}
                            `}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${player.rank > 3 ? 'text-gray-900' : ''}`}>
                      {player.score}
                    </p>
                    <p className={`text-sm ${player.rank > 3 ? 'text-gray-600' : 'text-white text-opacity-80'}`}>
                      points
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badge Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <BadgeInfo
            name="First Steps"
            description="Score your first 10 points"
            color="blue"
            points="10+"
          />
          <BadgeInfo
            name="Metadata Detective"
            description="Reach 50 points"
            color="purple"
            points="50+"
          />
          <BadgeInfo
            name="Fake-Spotter Pro"
            description="Achieve 100 points"
            color="green"
            points="100+"
          />
          <BadgeInfo
            name="Provenance Master"
            description="Earn 200+ points"
            color="red"
            points="200+"
          />
        </div>
      </motion.div>
    </div>
  );
};

const PodiumCard = ({ player, rank, isWinner = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={`
        card text-center relative overflow-hidden
        ${isWinner ? 'transform scale-105 ring-4 ring-yellow-400' : ''}
      `}
    >
      <div className={`
        absolute inset-0 bg-gradient-to-br opacity-10
        ${getRankColor(rank)}
      `} />
      
      <div className="relative z-10">
        <div className="mb-4">
          {getRankIcon(rank)}
        </div>
        
        <h3 className="font-bold text-lg text-gray-900 mb-1">
          {player.username}
        </h3>
        
        <p className="text-2xl font-bold text-blue-600 mb-2">
          {player.score}
        </p>
        
        <div className="flex flex-wrap justify-center gap-1">
          {player.badges.slice(0, 2).map((badge, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}
            >
              {badge}
            </span>
          ))}
          {player.badges.length > 2 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{player.badges.length - 2}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const BadgeInfo = ({ name, description, color, points }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <div className="text-center">
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${colorClasses[color]}`}>
        {name}
      </div>
      <p className="text-xs text-gray-600 mb-1">{description}</p>
      <p className="text-xs font-medium text-gray-800">{points}</p>
    </div>
  );
};

export default Leaderboard;