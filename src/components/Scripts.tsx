import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Star, 
  Copy, 
  Play, 
  Pause,
  MessageCircle,
  Phone,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export const Scripts: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('phone');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedScript, setSelectedScript] = useState(null);

  const scriptCategories = [
    { id: 'phone', label: 'Phone Scripts', icon: Phone },
    { id: 'objections', label: 'Objection Handling', icon: AlertTriangle },
    { id: 'voicemail', label: 'Voicemail Scripts', icon: MessageCircle },
    { id: 'followup', label: 'Follow-up Scripts', icon: CheckCircle }
  ];

  const scripts = {
    phone: [
      {
        id: 1,
        title: 'Winter Camp Enrollment',
        category: 'Camp Telethon',
        priority: 'high',
        script: `Hi [Parent's Name], this is [Your Name] from Oasis Gymnastics! I hope you're doing well today. I'm reaching out to share some exciting updates about our upcoming Winter camps. We're running a special promotion today for families who sign up early for our Winter Camps, and I didn't want you to miss out! We've reactivated our THANKS15 promo code, which gives you 15% off Winter Camp if you sign up today. This offer was originally just for Thanksgiving camp families, but we've extended it to everyone for today only! Additionally, we have some adorable gymnastics leotards that make a perfect holiday gift or camp accessory. This is a great opportunity to lock in your child's spot and save on Winter Camp. Can I help you with the enrollment process right now?`,
        tags: ['winter', 'camp', 'promotion', 'enrollment']
      },
      {
        id: 2,
        title: 'Summer Camp Flexible Prepaid',
        category: 'Camp Telethon',
        priority: 'high',
        script: `Hi [Parent's Name], this is [Your Name] from Oasis Gymnastics! For Summer Camp, we're offering a Flexible Prepaid option with early bird pricing. You can secure your spot now and decide on your camp weeks later, as long as you finalize your weeks by March 1st. It's a fantastic way to save and stay flexible with your schedule. You can choose from 1 to 4 weeks, and the prepaid blocks ensure your child gets a spot, even if you haven't finalized dates yet. Let me know which option works best for you, and I can help set everything up! We'll also send you a confirmation email with all the details, so everything is clear and easy to reference.`,
        tags: ['summer', 'camp', 'flexible', 'prepaid']
      },
      {
        id: 3,
        title: 'New Lead Introduction',
        category: 'Lead Management',
        priority: 'medium',
        script: `Hi [Parent's Name], this is [Your Name] from Oasis Gymnastics. Thank you for your interest in our programs! I wanted to personally reach out to let you know about our current offerings and help answer any questions you might have. We're currently offering free trial classes for new families, and I'd love to help you find the perfect program for your child. You can schedule online through our customer portal, or feel free to call us directly. We're excited about the possibility of welcoming your family to Oasis Gymnastics!`,
        tags: ['new lead', 'introduction', 'trial', 'welcome']
      }
    ],
    objections: [
      {
        id: 4,
        title: 'Price Concerns',
        category: 'Objection Handling',
        priority: 'high',
        script: `I completely understand wanting to make sure this fits your budget. What I've found is that many families are surprised by the value they get - not just the physical skills, but the confidence, discipline, and friendships their children develop. We also have several options to make it more affordable, including our new Membership Program that offers up to 50% off additional services like open gyms and Kids' Nights Out. Would you like me to explain some of our payment options that might help make this work for your family?`,
        tags: ['price', 'budget', 'value', 'payment options']
      },
      {
        id: 5,
        title: 'Schedule Conflicts',
        category: 'Objection Handling',
        priority: 'medium',
        script: `I hear this concern a lot, and I completely understand how busy family schedules can be. The good news is we have multiple class times throughout the week, and we're always happy to work with families to find something that fits. Even if the current schedule doesn't work perfectly, we often add new class times based on demand. Would you like me to put you on our waitlist for preferred times, or shall we look at some alternative schedules that might work better?`,
        tags: ['schedule', 'timing', 'flexibility', 'waitlist']
      },
      {
        id: 6,
        title: 'Need to Think About It',
        category: 'Objection Handling',
        priority: 'medium',
        script: `I completely understand wanting to think about it - it's an important decision for your family. Just so I can better help you, what specific aspects would you like to consider? Is it the schedule, the cost, or something else? I'd be happy to address any questions now, and I can also schedule a follow-up call. Just keep in mind that spots in our popular classes do fill up, so I'd hate for you to miss out if this is something you're genuinely interested in.`,
        tags: ['hesitation', 'decision', 'follow-up', 'urgency']
      }
    ],
    voicemail: [
      {
        id: 7,
        title: 'Re-engagement Voicemail',
        category: 'Drop Report',
        priority: 'high',
        script: `Hi, it's Jocelyn from Oasis Gymnastics. I'm reaching out because you were previously enrolled with us, and I have some exciting updates to share. We're under new leadership and have made some fantastic improvements that I think you'll love. Plus, we've introduced a new Membership Program offering perks like up to 50% off open gyms and Kids' Nights Out. I'd love to invite you to a free trial class, either in the program you were previously enrolled in or perhaps try something new. We're reopening tumbling and open gyms, and we're also offering programs in gymnastics and ninja. Keep an eye out for a follow-up email with all our program details. You can easily register through our customer portal or sign up for a free trial. If you have any questions, just give us a call. We'd love to welcome you back to Oasis Gymnastics!`,
        tags: ['re-engagement', 'former student', 'improvements', 'trial offer']
      },
      {
        id: 8,
        title: 'Sibling Outreach Voicemail',
        category: 'Drop Report',
        priority: 'medium',
        script: `Hi, this is Jocelyn from Oasis Gymnastics. I noticed that while your family still has active members with us, one of your children hasn't been enrolled recently. We have some exciting new programs and improvements that I'd love to share with you. As a current family, you're eligible for our special member rates and our new Membership Program benefits. I'd love to invite your child back for a free trial class to see all the improvements we've made. You can register through your existing customer portal or give us a call. We'd love to have your whole family active with us again!`,
        tags: ['sibling', 'current family', 'member rates', 'trial']
      }
    ],
    followup: [
      {
        id: 9,
        title: 'Post-Trial Follow-up',
        category: 'Lead Management',
        priority: 'high',
        script: `Hi [Parent's Name], this is [Your Name] from Oasis Gymnastics. I wanted to follow up on [Child's Name]'s trial class yesterday. I hope they had a great time! I'd love to hear about their experience and answer any questions you might have. If you're ready to get started, I can help you choose the perfect class schedule and get them enrolled today. We do have limited spots available, so I'd recommend securing their place soon. What questions can I answer for you?`,
        tags: ['post-trial', 'follow-up', 'enrollment', 'limited spots']
      },
      {
        id: 10,
        title: 'Callback Request Follow-up',
        category: 'Lead Management',
        priority: 'medium',
        script: `Hi [Parent's Name], this is [Your Name] from Oasis Gymnastics returning your call. Thank you for reaching out! I have all your information here and I'm ready to help answer any questions about our programs or help you get [Child's Name] enrolled. I have a few minutes right now if this is a good time to talk, or I'm happy to schedule a call at your convenience. What works best for you?`,
        tags: ['callback', 'return call', 'enrollment', 'scheduling']
      }
    ]
  };

  const currentScripts = scripts[activeCategory as keyof typeof scripts] || [];
  
  const filteredScripts = currentScripts.filter(script =>
    script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    script.script.toLowerCase().includes(searchTerm.toLowerCase()) ||
    script.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Scripts & Objection Handling</h1>
        <p className="text-slate-600">Access proven scripts and objection handling techniques</p>
      </div>

      {/* Search and Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search scripts by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {scriptCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredScripts.map((script) => (
          <div key={script.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-1">{script.title}</h3>
                <p className="text-sm text-slate-600">{script.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(script.priority)}`}>
                  {script.priority.toUpperCase()}
                </span>
                <Star className="h-5 w-5 text-gray-300 hover:text-yellow-400 cursor-pointer" />
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-slate-700 leading-relaxed line-clamp-6">
                {script.script}
              </p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {script.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Stop' : 'Practice'}
              </button>
              <button
                onClick={() => copyToClipboard(script.script)}
                className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
              <button className="text-blue-600 hover:text-blue-700 px-3 py-2">
                View Full Script
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredScripts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-600 mb-2">No scripts found</h3>
          <p className="text-slate-500">Try adjusting your search terms or category selection.</p>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Script Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Phone Script Tips:</h4>
            <ul className="text-sm space-y-1 opacity-90">
              <li>• Personalize with the family's name</li>
              <li>• Speak with enthusiasm and energy</li>
              <li>• Listen for buying signals</li>
              <li>• Create urgency without pressure</li>
              <li>• Always ask for the enrollment</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Objection Handling:</h4>
            <ul className="text-sm space-y-1 opacity-90">
              <li>• Acknowledge their concern first</li>
              <li>• Ask clarifying questions</li>
              <li>• Provide value-focused responses</li>
              <li>• Offer alternatives when possible</li>
              <li>• Confirm resolution before moving forward</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};