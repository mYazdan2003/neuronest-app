// Dashboard mockup
const Dashboard = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-indigo-700">Total Inquiries</h3>
        <p className="text-3xl font-bold">128</p>
        <p className="text-sm text-indigo-600">↑ 12% from last month</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-green-700">Active Listings</h3>
        <p className="text-3xl font-bold">45</p>
        <p className="text-sm text-green-600">↑ 5% from last month</p>
      </div>
      <div className="bg-amber-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-amber-700">Pending Maintenance</h3>
        <p className="text-3xl font-bold">8</p>
        <p className="text-sm text-amber-600">↓ 15% from last month</p>
      </div>
    </div>
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-3">Recent Inquiries</h3>
      <div className="bg-gray-50 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
              <td className="px-6 py-4 whitespace-nowrap">123 Main St, Bondi</td>
              <td className="px-6 py-4 whitespace-nowrap">Apr 14, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">New</span></td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Sarah Johnson</td>
              <td className="px-6 py-4 whitespace-nowrap">456 Park Ave, Surry Hills</td>
              <td className="px-6 py-4 whitespace-nowrap">Apr 13, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span></td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">Michael Brown</td>
              <td className="px-6 py-4 whitespace-nowrap">789 Ocean Dr, Manly</td>
              <td className="px-6 py-4 whitespace-nowrap">Apr 12, 2025</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Closed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Inquiry Trends</h3>
        <div className="bg-white p-4 rounded-lg border border-gray-200 h-64 flex items-center justify-center">
          [Chart: Line graph showing inquiry trends over time]
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">Property Performance</h3>
        <div className="bg-white p-4 rounded-lg border border-gray-200 h-64 flex items-center justify-center">
          [Chart: Bar graph showing property performance by suburb]
        </div>
      </div>
    </div>
  </div>
);

// Property List mockup
const PropertyList = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Properties</h2>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">+ New Property</button>
    </div>
    <div className="mb-6 flex flex-col md:flex-row gap-4">
      <input type="text" placeholder="Search properties..." className="flex-1 px-4 py-2 border border-gray-300 rounded-md" />
      <select className="px-4 py-2 border border-gray-300 rounded-md">
        <option>All Statuses</option>
        <option>For Sale</option>
        <option>For Rent</option>
        <option>Sold</option>
        <option>Leased</option>
      </select>
      <select className="px-4 py-2 border border-gray-300 rounded-md">
        <option>All Suburbs</option>
        <option>Bondi</option>
        <option>Surry Hills</option>
        <option>Paddington</option>
        <option>Newtown</option>
      </select>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="h-48 bg-gray-200 relative">
          <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 text-sm rounded">For Sale</div>
          <img src="[Property Image]" alt="Property" className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">123 Main St</h3>
          <p className="text-gray-600 mb-2">Bondi, NSW</p>
          <p className="text-xl font-bold text-indigo-600 mb-2">$1,250,000</p>
          <div className="flex justify-between text-gray-600">
            <span>3 Beds</span>
            <span>2 Baths</span>
            <span>1 Parking</span>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="h-48 bg-gray-200 relative">
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-sm rounded">For Rent</div>
          <img src="[Property Image]" alt="Property" className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">456 Park Ave</h3>
          <p className="text-gray-600 mb-2">Surry Hills, NSW</p>
          <p className="text-xl font-bold text-indigo-600 mb-2">$750/week</p>
          <div className="flex justify-between text-gray-600">
            <span>2 Beds</span>
            <span>1 Bath</span>
            <span>0 Parking</span>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="h-48 bg-gray-200 relative">
          <div className="absolute top-2 right-2 bg-gray-600 text-white px-2 py-1 text-sm rounded">Sold</div>
          <img src="[Property Image]" alt="Property" className="w-full h-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">789 Ocean Dr</h3>
          <p className="text-gray-600 mb-2">Manly, NSW</p>
          <p className="text-xl font-bold text-indigo-600 mb-2">$1,850,000</p>
          <div className="flex justify-between text-gray-600">
            <span>4 Beds</span>
            <span>3 Baths</span>
            <span>2 Parking</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Bot Interface mockup
const BotInterface = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6">Property Description Bot</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Property Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Address</label>
            <input type="text" value="123 Main St, Bondi, NSW 2026" className="w-full px-4 py-2 border border-gray-300 rounded-md" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
              <option>Apartment</option>
              <option>House</option>
              <option>Townhouse</option>
              <option>Villa</option>
              <option>Land</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <input type="number" value="3" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <input type="number" value="2" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
              <input type="number" value="1" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md" rows={4} placeholder="Enter key features of the property...">Ocean views, renovated kitchen, hardwood floors, close to beach, modern appliances</textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md" rows={4} placeholder="Enter any additional information...">Recently renovated with high-end finishes. North-facing balcony with ocean views. Walking distance to shops, restaurants, and public transport.</textarea>
          </div>
          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Generate Description</button>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Generated Description</h3>
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div>
            <h4 className="text-lg font-medium text-gray-700">Headline</h4>
            <p className="text-xl font-bold text-indigo-600">Stunning Beachside Apartment with Ocean Views in Bondi</p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700">Description</h4>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-800">
                Welcome to this breathtaking 3-bedroom apartment in the heart of Bondi, where luxury meets coastal living. This recently renovated home features high-end finishes throughout, creating a sophisticated yet comfortable living environment.
              </p>
              <p className="text-gray-800 mt-2">
                The open-plan living area flows seamlessly onto a north-facing balcony, offering stunning ocean views that create a perfect backdrop for entertaining or relaxing. The renovated kitchen boasts modern appliances and elegant design, making it a joy for cooking enthusiasts.
              </p>
              <p className="text-gray-800 mt-2">
                Beautiful hardwood floors run throughout the property, adding warmth and character to each room. The location is unbeatable - just moments from Bondi Beach, with shops, restaurants, and public transport all within walking distance.
              </p>
              <p className="text-gray-800 mt-2">
                This property represents a rare opportunity to secure a premium residence in one of Sydney's most sought-after beachside suburbs.
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700">Key Features</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
              <li>3 spacious bedrooms with built-in wardrobes</li>
              <li>2 modern bathrooms with high-end fixtures</li>
              <li>Renovated kitchen with premium appliances</li>
              <li>North-facing balcony with stunning ocean views</li>
              <li>Beautiful hardwood floors throughout</li>
              <li>Secure parking space</li>
              <li>Walking distance to Bondi Beach</li>
              <li>Close to shops, restaurants, and public transport</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-700">SEO Keywords</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">Bondi apartment</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">Ocean view</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">Beachside living</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">Renovated apartment</span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">Sydney luxury property</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex-1 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50">Regenerate</button>
            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Use This Description</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// White Label Settings mockup
const WhiteLabelSettings = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-6">White Label Settings</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Branding</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" value="Coastal Properties" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                <div className="flex items-center">
                  <input type="color" value="#0ea5e9" className="h-10 w-10 rounded-md border border-gray-300" />
                  <input type="text" value="#0ea5e9" className="ml-2 flex-1 px-4 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
                <div className="flex items-center">
                  <input type="color" value="#14b8a6" className="h-10 w-10 rounded-md border border-gray-300" />
                  <input type="text" value="#14b8a6" className="ml-2 flex-1 px-4 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
              <div className="flex items-center">
                <div className="h-16 w-32 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-gray-400">[Logo Preview]</span>
                </div>
                <button className="ml-4 text-indigo-600 hover:text-indigo-500">Upload Logo</button>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" value="info@coastalproperties.com" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input type="text" value="+1 (555) 123-4567" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custom Domain</label>
              <input type="text" value="app.coastalproperties.com" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-4">Messaging</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Welcome Message</label>
              <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md" rows={3}>Welcome to Coastal Properties, your trusted partner in finding the perfect beachside home. We're here to help you navigate the real estate market with ease.</textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Signature</label>
              <textarea className="w-full px-4 py-2 border border-gray-300 rounded-md" rows={4}>Best regards,
The Coastal Properties Team
Phone: +1 (555) 123-4567
Email: info@coastalproperties.com
Website: www.coastalproperties.com</textarea>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold mb-4">Preview</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center">
              <div className="h-8 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-500 text-xs">[Logo]</span>
              </div>
              <span className="ml-2 font-medium text-sky-600">Coastal Properties</span>
            </div>
            <div className="mt-4 flex space-x-2">
              <div className="h-8 w-24 rounded-md flex items-center justify-center text-white text-xs bg-sky-500">
                Primary Button
              </div>
              <div className="h-8 w-24 rounded-md flex items-center justify-center text-white text-xs bg-teal-500">
                Secondary Button
              </div>
            </div>
            <div className="mt-4 text-xs">
              <div className="font-medium mb-1">Welcome Message:</div>
              <div className="text-gray-600">Welcome to Coastal Properties, your trusted partner in finding the perfect beachside home...</div>
            </div>
          </div>
          <button className="w-full mt-4 border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50">Preview Full Application</button>
        </div>
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Save Settings</button>
      </div>
    </div>
  </div>
);

// Analytics Dashboard mockup
const AnalyticsDashboard = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Analytics & Insights</h2>
      <select className="px-4 py-2 border border-gray-300 rounded-md">
        <option>Last 30 Days</option>
        <option>Last 7 Days</option>
        <option>Last 90 Days</option>
        <option>This Year</option>
      </select>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-indigo-700">Total Inquiries</h3>
        <p className="text-3xl font-bold">128</p>
        <p className="text-sm text-indigo-600">↑ 12% from previous period</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-green-700">Avg. Response Time</h3>
        <p className="text-3xl font-bold">2.4h</p>
        <p className="text-sm text-green-600">↓ 15% from previous period</p>
      </div>
      <div className="bg-amber-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-amber-700">Active Listings</h3>
        <p className="text-3xl font-bold">45</p>
        <p className="text-sm text-amber-600">↑ 5% from previous period</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-700">Avg. Days on Market</h3>
        <p className="text-3xl font-bold">18</p>
        <p className="text-sm text-blue-600">↓ 8% from previous period</p>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Inquiry Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50">
          [Chart: Line graph showing inquiry trends over time]
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Property Performance</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50">
          [Chart: Bar graph showing property performance by suburb]
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Conversion Rates</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Inquiry to Viewing</span>
              <span className="text-sm font-medium">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Viewing to Offer</span>
              <span className="text-sm font-medium">28%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '28%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Offer to Sale</span>
              <span className="text-sm font-medium">72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold">User Activity</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-500">View All</button>
        </div>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="ml-3">
              <p className="text-sm font-medium">Jane Smith</p>
              <p className="text-xs text-gray-500">Responded to inquiry from John Doe</p>
              <p className="text-xs text-gray-400">10:23 AM</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="ml-3">
              <p className="text-sm font-medium">Mike Johnson</p>
              <p className="text-xs text-gray-500">Created new property listing</p>
              <p className="text-xs text-gray-400">9:45 AM</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="ml-3">
              <p className="text-sm font-medium">Sarah Williams</p>
              <p className="text-xs text-gray-500">Generated property description using bot</p>
              <p className="text-xs text-gray-400">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Client Satisfaction</h3>
        <div className="flex justify-center mb-3">
          <div className="text-5xl font-bold text-indigo-600">4.8</div>
          <div className="ml-2 flex flex-col justify-center">
            <div className="flex text-amber-400">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div className="text-xs text-gray-500">Based on 128 reviews</div>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex items-center">
              <span className="text-xs mr-2">5</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-xs ml-2">85%</span>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-xs mr-2">4</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>
              <span className="text-xs ml-2">12%</span>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-xs mr-2">3</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '3%' }}></div>
              </div>
              <span className="text-xs ml-2">3%</span>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-xs mr-2">2</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <span className="text-xs ml-2">0%</span>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-xs mr-2">1</span>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <span className="text-xs ml-2">0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
