import MeetingCalendar from "../../components/MeetingCalendar";
import React, { useState, useEffect } from 'react';


import { Link } from 'react-router-dom';
// import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
// import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle, Wallet } from 'lucide-react';



export const EntrepreneurDashboard: React.FC = () => {
  const [selectedInvestor, setSelectedInvestor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openInvestorModal = (investor: any) => {
    setSelectedInvestor(investor);
    setIsModalOpen(true);
  };

  const closeInvestorModal = () => {
    setSelectedInvestor(null);
    setIsModalOpen(false);
  };
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors, setRecommendedInvestors] = useState(investors.slice(0, 3));

  const upcomingMeetings = [
    {
      title: "Investor Pitch - Michael",
      date: "10 March 2026",
      time: "2:00 PM"
    },
    {
      title: "Startup Strategy Call",
      date: "15 March 2026",
      time: "11:00 AM"
    }
  ];

  const activities = [
    {
      text: "Investor Michael viewed your startup",
      time: "2 hours ago"
    },
    {
      text: "Meeting scheduled with Jennifer Lee",
      time: "Yesterday"
    },
    {
      text: "Pitch deck sent to Robert Torres",
      time: "2 days ago"
    },
    {
      text: "New investor joined platform",
      time: "3 days ago"
    }
  ];
  const quickActions = [
    { title: "Schedule Meeting", icon: "📅" },
    { title: "Upload Pitch Deck", icon: "📤" },
    { title: "Find Investors", icon: "🔍" }
  ];


  useEffect(() => {
    if (user) {
      // Load collaboration requests
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);


  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };


  if (!user) return null;


  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');

  return (

    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        {/* <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
        </div> */}
        {/* <Link to="/video-call">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Start Video Call
          </button>
        </Link> */}
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
              <p className="text-gray-600">Here's what's happening with your startup today</p>
            </div>

            
          </div>
        </div>
        <Link to="/investors">
          <Button
            leftIcon={<PlusCircle size={18} />}
          >
            Find Investors
          </Button>
        </Link>
      </div>
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Bell size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Pending Requests</p>
                <h3 className="text-xl font-semibold text-primary-900">{pendingRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <Users size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Total Connections</p>
                <h3 className="text-xl font-semibold text-secondary-900">
                  {collaborationRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Calendar size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Upcoming Meetings</p>
                <h3 className="text-xl font-semibold text-accent-900">2</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-success-50 border border-success-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <TrendingUp size={20} className="text-success-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-success-700">Profile Views</p>
                <h3 className="text-xl font-semibold text-success-900">24</h3>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-emerald-50 border border-emerald-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-emerald-100 rounded-full mr-4">
                {/* <Wallet size={20} className="text-emerald-700" /> */}
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-700">Wallet Balance</p>
                <h3 className="text-xl font-semibold text-emerald-900">$24,500</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="bg-white shadow rounded-xl p-4 mt-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {quickActions.map((action, index) => (
            <button
              key={index}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 p-4 rounded-lg font-medium transition"
            >
              <span>{action.icon}</span>
              {action.title}
            </button>
          ))}
          <div className="flex items-center gap-3">
              <Link to="/payments">
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                  Open Payments
                </button>
              </Link>

              <Link to="/video-call">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Start Video Call
                </button>
              </Link>
            </div>

        </div>
      </div>
      <div className="bg-white shadow rounded-xl p-4 mt-6">
        <h3 className="text-lg font-semibold mb-3">Upcoming Meetings</h3>

        {upcomingMeetings.map((meeting, index) => (
          <div key={index} className="border-b py-2">
            <p className="font-medium">{meeting.title}</p>
            <p className="text-sm text-gray-500">
              {meeting.date} • {meeting.time}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* Calendar */}
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">📅 Meeting Calendar</h2>
            </CardHeader>

            <CardBody>
              <MeetingCalendar />
            </CardBody>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

          {activities.map((activity, index) => (
            <div key={index} className="border-b py-2">
              <p className="text-sm">{activity.text}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>

      </div>
      {isModalOpen && selectedInvestor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 relative">

            <button
              onClick={closeInvestorModal}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✖
            </button>

            <h2 className="text-xl font-semibold">
              {selectedInvestor.name}
            </h2>

            <p className="text-sm text-gray-500">
              {selectedInvestor.title} • {selectedInvestor.company}
            </p>

            <p className="mt-4 text-sm">
              {selectedInvestor.bio}
            </p>

            <div className="mt-4 text-sm border-t pt-3">
              <p>Email: {selectedInvestor.email}</p>
              <p>Phone: {selectedInvestor.phone}</p>
            </div>

            <button
              onClick={closeInvestorModal}
              className="w-full mt-5 bg-black text-white py-2 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration requests */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Collaboration Requests</h2>
              <Badge variant="primary">{pendingRequests.length} pending</Badge>
            </CardHeader>

            <CardBody>
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map(request => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <AlertCircle size={24} className="text-gray-500" />
                  </div>
                  <p className="text-gray-600">No collaboration requests yet</p>
                  <p className="text-sm text-gray-500 mt-1">When investors are interested in your startup, their requests will appear here</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>


        {/* Recommended investors */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recommended Investors</h2>
              <Link to="/investors" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </CardHeader>

            <CardBody className="space-y-4">
              {recommendedInvestors.map(investor => (
                <div
                  key={investor.id}
                  onClick={() => openInvestorModal(investor)}
                  className="cursor-pointer"
                >
                  <InvestorCard
                    investor={investor}
                    showActions={false}
                  />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>

  );
};