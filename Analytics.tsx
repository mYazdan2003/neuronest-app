import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormSelect from '@/components/ui/FormSelect';

interface AnalyticsProps {
  stats: {
    inquiries: any[];
    properties: any[];
    conversions: any[];
    userActivity: any[];
  };
}

export default function Analytics({ stats }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('30');
  
  return (
    <div>
      <Header 
        title="Analytics & Insights" 
        subtitle="Track performance and gain valuable insights"
      />
      
      <div className="mb-6 flex justify-end">
        <FormSelect
          id="timeRange"
          label="Time Range"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          options={[
            { value: '7', label: 'Last 7 days' },
            { value: '30', label: 'Last 30 days' },
            { value: '90', label: 'Last 90 days' },
            { value: '365', label: 'Last year' },
          ]}
          className="w-48"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Inquiry Trends">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">Inquiry trend chart would render here</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Total Inquiries</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inquiries.length}</p>
              <p className="text-sm text-green-600">+12% from previous period</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Avg. Response Time</p>
              <p className="text-2xl font-bold text-gray-900">2.5 hrs</p>
              <p className="text-sm text-green-600">-15% from previous period</p>
            </div>
          </div>
        </Card>
        
        <Card title="Property Performance">
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">Property performance chart would render here</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.properties.filter(p => p.status === 'FOR_SALE' || p.status === 'FOR_RENT').length}</p>
              <p className="text-sm text-green-600">+5% from previous period</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Avg. Days on Market</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="text-sm text-red-600">+3 days from previous period</p>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card title="Conversion Rates">
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">Conversion funnel chart would render here</p>
          </div>
          <div className="mt-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">Inquiry to Viewing</div>
                  <div className="text-sm font-medium text-blue-600">42%</div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">Viewing to Offer</div>
                  <div className="text-sm font-medium text-blue-600">28%</div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">Offer to Sale</div>
                  <div className="text-sm font-medium text-blue-600">75%</div>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="User Activity">
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">User activity chart would render here</p>
          </div>
          <div className="mt-4">
            <div className="space-y-2">
              {stats.userActivity.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-sm font-medium">
                      {activity.user.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">View All Activity</Button>
            </div>
          </div>
        </Card>
        
        <Card title="Client Satisfaction">
          <div className="h-60 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">Client satisfaction chart would render here</p>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">4.8</p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star} 
                      className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">Based on 128 reviews</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">5 stars</div>
                  <div className="text-sm font-medium text-gray-500">85%</div>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">4 stars</div>
                  <div className="text-sm font-medium text-gray-500">10%</div>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">3 stars</div>
                  <div className="text-sm font-medium text-gray-500">5%</div>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card title="Performance by Location">
        <div className="h-96 flex items-center justify-center bg-gray-50 rounded-md">
          <p className="text-gray-500">Map visualization would render here</p>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suburb
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listings
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inquiries
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conversion Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {['Bondi', 'Surry Hills', 'Paddington', 'Newtown', 'Manly'].map((suburb, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {suburb}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 20) + 5}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(Math.floor(Math.random() * 1000) + 500) * 1000}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 50) + 10}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 40) + 20}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
