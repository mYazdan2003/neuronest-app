import React from 'react';
import Header from '@/components/ui/Header';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';

interface DashboardProps {
  stats: {
    inquiries: number;
    properties: number;
    maintenance: number;
    matches: number;
  };
  recentInquiries: any[];
}

export default function Dashboard({ stats, recentInquiries }: DashboardProps) {
  return (
    <div>
      <Header 
        title="Dashboard" 
        subtitle="Overview of your real estate activities"
      />
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Inquiries"
          value={stats.inquiries}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          change={{ value: '12%', type: 'increase' }}
        />
        <StatCard
          title="Active Properties"
          value={stats.properties}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
          change={{ value: '5%', type: 'increase' }}
        />
        <StatCard
          title="Maintenance Requests"
          value={stats.maintenance}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
          change={{ value: '3%', type: 'decrease' }}
        />
        <StatCard
          title="Buyer Matches"
          value={stats.matches}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          change={{ value: '8%', type: 'increase' }}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Recent Inquiries">
          <Table
            data={recentInquiries}
            columns={[
              {
                header: 'Client',
                accessor: 'client_name',
                render: (item) => (
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.client_name}</div>
                      <div className="text-sm text-gray-500">{item.email}</div>
                    </div>
                  </div>
                ),
              },
              {
                header: 'Property',
                accessor: 'property',
              },
              {
                header: 'Status',
                accessor: 'status',
                render: (item) => (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'OPEN' ? 'bg-green-100 text-green-800' : 
                    item.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                ),
              },
              {
                header: 'Date',
                accessor: 'date',
              },
            ]}
            onRowClick={(item) => console.log('Clicked:', item)}
            emptyMessage="No recent inquiries"
          />
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm">
              View all inquiries
            </Button>
          </div>
        </Card>
        
        <Card title="Performance Metrics">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">Response Time</div>
                <div className="text-sm font-medium text-green-600">2.5 hours</div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">85% better than average</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">Inquiry Conversion</div>
                <div className="text-sm font-medium text-blue-600">42%</div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">12% increase from last month</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">Client Satisfaction</div>
                <div className="text-sm font-medium text-indigo-600">4.8/5</div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '96%' }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">Based on client feedback</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
