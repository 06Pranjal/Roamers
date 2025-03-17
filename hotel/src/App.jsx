import { useState } from 'react';
import { 
  Zap, 
  Upload, 
  Activity, 
  Newspaper, 
  LogOut, 
  Bot, 
  AlertTriangle, 
  Lightbulb, 
  ArrowLeft,
  Calendar,
  TrendingUp,
  DollarSign,
  Leaf,
  ExternalLink,
  Tv,
  Smartphone,
  Fan,
  Refrigerator,
  Laptop,
  Wifi,
  Award,
  Target,
  Sun,
  Wind,
  Battery,
  Home
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [bills, setBills] = useState<File[]>([]);
  const [isSignup, setIsSignup] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBills([...Array.from(e.target.files)]);
    }
  };

  const consumptionData = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'kWh Usage',
        data: [420, 380, 310],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
    ],
  };

  const applianceData = {
    labels: ['HVAC', 'Lighting', 'Kitchen', 'Electronics', 'Others'],
    datasets: [
      {
        data: [35, 20, 25, 15, 5],
        backgroundColor: [
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(107, 114, 128, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const recommendations = [
    {
      icon: <Tv className="w-6 h-6 text-green-500" />,
      title: "Smart TV Usage",
      saving: "$15/month",
      description: "Enable power saving mode and reduce brightness during evening hours"
    },
    {
      icon: <Fan className="w-6 h-6 text-blue-500" />,
      title: "HVAC Optimization",
      saving: "$45/month",
      description: "Set temperature to 78°F in summer and use ceiling fans"
    },
    {
      icon: <Refrigerator className="w-6 h-6 text-orange-500" />,
      title: "Refrigerator Settings",
      saving: "$20/month",
      description: "Keep temperature between 37-40°F and clean coils regularly"
    },
    {
      icon: <Laptop className="w-6 h-6 text-purple-500" />,
      title: "Electronics Management",
      saving: "$25/month",
      description: "Use power strips to eliminate phantom energy consumption"
    },
    {
      icon: <Wifi className="w-6 h-6 text-gray-500" />,
      title: "Smart Home Integration",
      saving: "$30/month",
      description: "Install smart plugs to automate device power management"
    }
  ];

  const achievements = [
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: "Energy Saver",
      level: "Level 2",
      progress: 60,
      nextLevel: "Level 3"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Goal Setter",
      level: "Level 3",
      progress: 75,
      nextLevel: "Level 4"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Eco Warrior",
      level: "Level 1",
      progress: 40,
      nextLevel: "Level 2"
    }
  ];

  const AuthForm = () => (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-center mb-10">
          <Zap className="w-10 h-10 text-green-500" />
          <h1 className="text-4xl font-bold ml-3 text-gray-800">EcoWatt</h1>
        </div>

        {isSignup ? (
          <>
            <div className="mb-8">
              <button
                onClick={() => setIsSignup(false)}
                className="flex items-center text-gray-600 hover:text-green-500 transition-colors text-lg"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Sign In
              </button>
              <h2 className="text-3xl font-semibold text-gray-800 mt-6">Create Account</h2>
              <p className="text-gray-600 mt-2 text-lg">Join us in saving energy today</p>
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors text-lg font-medium"
              >
                Create Account
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 mt-2 text-lg">Sign in to continue to EcoWatt</p>
            </div>
            <div className="space-y-6">
              <div>
                <label htmlFor="signin-email" className="block text-lg font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="signin-email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="signin-password" className="block text-lg font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="signin-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors text-lg font-medium"
              >
                Sign In
              </button>
              <div className="text-center text-lg">
                <span className="text-gray-600">Don't have an account?</span>
                <button
                  onClick={() => setIsSignup(true)}
                  className="ml-2 text-green-500 hover:text-green-600 font-medium"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-[2000px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-green-500" />
              <span className="ml-3 text-2xl font-semibold">EcoWatt</span>
            </div>
            <div className="flex space-x-6 sm:space-x-10">
              <button
                onClick={() => setActiveTab('home')}
                className={`${activeTab === 'home' ? 'text-green-500' : 'text-gray-600'} hover:text-green-500 text-base sm:text-lg font-medium`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`${activeTab === 'activity' ? 'text-green-500' : 'text-gray-600'} hover:text-green-500 text-base sm:text-lg font-medium`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`${activeTab === 'news' ? 'text-green-500' : 'text-gray-600'} hover:text-green-500 text-base sm:text-lg font-medium`}
              >
                News
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-gray-600 hover:text-red-500"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full">
        <div className="max-w-[2000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          {activeTab === 'home' && (
            <div className="space-y-6 sm:space-y-10">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                  <Bot className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4 sm:mb-0" />
                  <div className="sm:ml-6">
                    <h2 className="text-xl sm:text-2xl font-semibold">Upload Bills for Analysis</h2>
                    <p className="text-gray-600 text-base sm:text-lg mt-2">Upload your last three months' electricity bills for AI-powered analysis</p>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-10 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="bill-upload"
                  />
                  <label
                    htmlFor="bill-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4 sm:mb-6" />
                    <span className="text-base sm:text-lg text-gray-600">Click to upload bills</span>
                    <span className="text-sm sm:text-base text-gray-500 mt-2">PDF, JPG, or PNG files accepted</span>
                  </label>
                </div>
              </div>

              {bills.length > 0 && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
                        <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-2 sm:mr-3" />
                        Monthly Consumption Trends
                      </h3>
                      <div className="h-64 sm:h-80">
                        <Bar 
                          data={consumptionData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'top',
                              },
                              title: {
                                display: false,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                      <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center">
                        <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2 sm:mr-3" />
                        Energy Usage Distribution
                      </h3>
                      <div className="h-64 sm:h-80">
                        <Doughnut 
                          data={applianceData}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'right',
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                    <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 flex items-center">
                      <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2 sm:mr-3" />
                      Personalized Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:border-green-500 transition-colors">
                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                              {rec.icon}
                            </div>
                            <span className="text-green-600 font-semibold text-base sm:text-lg">{rec.saving}</span>
                          </div>
                          <h4 className="font-medium text-base sm:text-lg text-gray-900 mb-2 sm:mb-3">{rec.title}</h4>
                          <p className="text-sm sm:text-base text-gray-600">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Recent Activity</h2>
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-start space-x-6">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-xl text-gray-900">March Bill Analysis Complete</p>
                      <p className="text-gray-600 text-lg mt-2">Your March electricity bill has been analyzed. We found potential savings of up to $35.</p>
                      <p className="text-base text-green-600 mt-2">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-xl text-gray-900">Consumption Decreased</p>
                      <p className="text-gray-600 text-lg mt-2">Great job! Your energy usage decreased by 15% compared to last month. Keep up the good work!</p>
                      <p className="text-base text-green-600 mt-2">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <DollarSign className="w-8 h-8 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-xl text-gray-900">Potential Savings Found</p>
                      <p className="text-gray-600 text-lg mt-2">We identified potential savings of $45/month based on your usage patterns. Check our recommendations for details.</p>
                      <p className="text-base text-green-600 mt-2">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Award className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-xl text-gray-900">Achievement Unlocked</p>
                      <p className="text-gray-600 text-lg mt-2">Congratulations! You've earned the "Energy Saver" badge for reducing your consumption for 3 consecutive months.</p>
                      <p className="text-base text-green-600 mt-2">3 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Achievement Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="p-4 sm:p-6 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        {achievement.icon}
                        <span className="text-lg font-medium text-gray-600">{achievement.level}</span>
                      </div>
                      <h3 className="text-xl font-medium mb-3">{achievement.title}</h3>
                      <div className="mt-3 h-3 bg-gray-200 rounded-full">
                        <div 
                          className="h-3 bg-green-500 rounded-full" 
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-base text-gray-600 mt-3">{achievement.progress}% to {achievement.nextLevel}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Latest Energy News</h2>
                <div className="grid gap-6 sm:gap-8">
                  <article className="border-b border-gray-200 pb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg text-green-600 font-medium">Energy Efficiency</span>
                      <span className="text-base text-gray-500">March 15, 2024</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Revolutionary Smart Home Technologies That Save Energy</h3>
                    <p className="text-lg text-gray-600 mb-6">Discover the latest smart home innovations that can help reduce your energy consumption and save money on bills. From AI-powered thermostats to automated lighting systems, learn how these technologies are transforming home energy management.</p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center text-lg">
                      Read More
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </article>

                  <article className="border-b border-gray-200 pb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg text-green-600 font-medium">Policy Updates</span>
                      <span className="text-base text-gray-500">March 14, 2024</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Federal Government Announces $5 Billion Energy Rebate Program</h3>
                    <p className="text-lg text-gray-600 mb-6">A comprehensive guide to the new government initiatives helping homeowners upgrade to energy-efficient appliances. Learn about available rebates, eligibility criteria, and how to apply for these incentives.</p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center text-lg">
                      Read More
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </article>

                  <article className="border-b border-gray-200 pb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg text-green-600 font-medium">Tips & Tricks</span>
                      <span className="text-base text-gray-500">March 13, 2024</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">15 Professional Tips to Slash Your Summer Energy Bills</h3>
                    <p className="text-lg text-gray-600 mb-6">Expert advice on maintaining optimal home temperature while minimizing energy costs during peak summer months. Includes practical strategies for HVAC efficiency, natural cooling methods, and smart device usage.</p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center text-lg">
                      Read More
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </article>

                  <article className="pb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg text-green-600 font-medium">Industry Trends</span>
                      <span className="text-base text-gray-500">March 12, 2024</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">The Rise of Community Solar Projects</h3>
                    <p className="text-lg text-gray-600 mb-6">How neighborhood solar initiatives are revolutionizing renewable energy access. Learn about the benefits of community solar, how to join a project, and the potential savings for participants.</p>
                    <a href="#" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center text-lg">
                      Read More
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </article>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  return isLoggedIn ? <Dashboard /> : <AuthForm />;
}

export default App;