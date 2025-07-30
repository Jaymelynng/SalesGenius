import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Target,
  Play,
  Pause,
  Copy,
  Edit,
  BarChart3,
  Zap,
  CheckCircle
} from 'lucide-react';
import { Script, EmailTemplate } from '../types';

export const AutomatedScripts: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [activeTab, setActiveTab] = useState<'scripts' | 'emails'>('scripts');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with API calls
    setScripts([
      {
        id: '1',
        title: 'Initial Contact - Phone Script',
        category: 'initial-contact',
        stage: 'initial-contact',
        content: `Hi [Parent Name], this is [Your Name] from [Gym Name]. Thank you for your interest in our programs for [Student Name]! 

I wanted to personally reach out to help answer any questions you might have and see if we can find the perfect program for [Student Name].

Based on [Student Name]'s age ([Student Age]), I think our [Program Type] would be a great fit. We're currently offering free trial classes so [Student Name] can experience what we're all about.

Would you like to schedule a trial class? I have availability [Available Times]. What works best for your schedule?`,
        variables: ['Parent Name', 'Your Name', 'Gym Name', 'Student Name', 'Student Age', 'Program Type', 'Available Times'],
        successRate: 0,
        lastUpdated: new Date(),
        tags: ['phone', 'initial', 'trial-booking']
      },
      {
        id: '2',
        title: 'Trial Booking Confirmation',
        category: 'trial-booking',
        stage: 'trial-booking',
        content: `Perfect! I have [Student Name] scheduled for a trial class on [Trial Date] at [Trial Time] for our [Program Name] class.

Here's what to expect:
- Please arrive 10 minutes early for a brief orientation
- [Student Name] should wear comfortable athletic clothing
- We'll provide all necessary equipment
- The trial class is completely free with no obligation

I'll send you a confirmation email with all the details and our address. Do you have any questions about what to expect?

We're excited to meet [Student Name] and show you what makes our program special!`,
        variables: ['Student Name', 'Trial Date', 'Trial Time', 'Program Name'],
        successRate: 0,
        lastUpdated: new Date(),
        tags: ['phone', 'confirmation', 'trial']
      },
      {
        id: '3',
        title: 'Post-Trial Follow-up Call',
        category: 'trial-follow-up',
        stage: 'follow-up',
        content: `Hi [Parent Name], this is [Your Name] from [Gym Name]. I wanted to follow up on [Student Name]'s trial class yesterday.

How did [Student Name] enjoy the experience? [Instructor Name] mentioned that [Student Name] [Positive Observation].

I'd love to hear your thoughts and answer any questions you might have about our programs. 

If you're ready to get [Student Name] started, I can help you choose the perfect class schedule and get them enrolled today. We do have limited spots available, so I'd recommend securing [Student Name]'s place soon.

What questions can I answer for you?`,
        variables: ['Parent Name', 'Your Name', 'Gym Name', 'Student Name', 'Instructor Name', 'Positive Observation'],
        successRate: 0,
        lastUpdated: new Date(),
        tags: ['phone', 'follow-up', 'conversion']
      }
    ]);

    setEmailTemplates([
      {
        id: '1',
        name: 'Welcome & Trial Booking',
        subject: 'Welcome to [Gym Name] - Let\'s Schedule [Student Name]\'s Free Trial!',
        content: `Hi [Parent Name],

Thank you for your interest in [Gym Name]! We're excited about the possibility of having [Student Name] join our gymnastics family.

Based on [Student Name]'s age ([Student Age]), our [Recommended Program] would be perfect. This program focuses on [Program Benefits] and helps children develop [Key Skills].

**Ready to try a FREE trial class?**

[SCHEDULE TRIAL BUTTON]

**What to Expect:**
• 10-minute orientation for parents
• [Student Name] will participate in a full class experience
• Meet our certified instructors
• See our state-of-the-art facility
• No pressure, no obligation

**Trial Class Details:**
• Duration: [Class Duration]
• What to wear: Comfortable athletic clothing
• What we provide: All equipment and instruction

Have questions? Simply reply to this email or call us at [Phone Number].

We can't wait to meet [Student Name]!

Best regards,
[Your Name]
[Gym Name]`,
        stage: 'initial-contact',
        variables: ['Parent Name', 'Gym Name', 'Student Name', 'Student Age', 'Recommended Program', 'Program Benefits', 'Key Skills', 'Class Duration', 'Phone Number', 'Your Name'],
        openRate: 0,
        clickRate: 0,
        conversionRate: 0,
        lastUsed: new Date()
      },
      {
        id: '2',
        name: 'Trial Confirmation & Preparation',
        subject: 'You\'re all set! [Student Name]\'s trial class is confirmed for [Trial Date]',
        content: `Hi [Parent Name],

Great news! [Student Name]'s trial class is confirmed:

**Trial Class Details:**
📅 Date: [Trial Date]
⏰ Time: [Trial Time]
📍 Location: [Gym Address]
👨‍🏫 Instructor: [Instructor Name]
🏃‍♀️ Program: [Program Name]

**Before You Arrive:**
• Please arrive 10 minutes early
• Bring a water bottle for [Student Name]
• [Student Name] should wear comfortable athletic clothing
• Socks are required (we have grip socks available for purchase)

**What [Student Name] Will Experience:**
• Warm-up activities and stretching
• Introduction to basic gymnastics skills
• Fun games and activities
• Cool-down and flexibility

**Questions?** 
Call or text us at [Phone Number] or reply to this email.

**Can't make it?** 
No problem! Just let us know and we'll reschedule.

We're excited to meet [Student Name] and show you what makes [Gym Name] special!

See you soon,
[Your Name]
[Gym Name]`,
        stage: 'trial-booking',
        variables: ['Parent Name', 'Student Name', 'Trial Date', 'Trial Time', 'Gym Address', 'Instructor Name', 'Program Name', 'Phone Number', 'Your Name', 'Gym Name'],
        openRate: 0,
        clickRate: 0,
        conversionRate: 0,
        lastUsed: new Date()
      },
      {
        id: '3',
        name: 'Post-Trial Follow-up',
        subject: 'How did [Student Name] enjoy the trial class?',
        content: `Hi [Parent Name],

I hope [Student Name] had an amazing time at yesterday's trial class! 

[Instructor Name] was so impressed with [Student Name]'s [Positive Feedback]. It's clear that [Student Name] has natural ability and enthusiasm for gymnastics!

**Ready to continue the journey?**

I'd love to help you find the perfect ongoing class for [Student Name]. Based on what we observed, I recommend:

🌟 **[Recommended Class]**
📅 [Class Schedule]
💰 Monthly tuition: [Tuition Amount]

**Special Enrollment Offer:**
Enroll by [Deadline] and receive:
• [Enrollment Bonus]
• [Additional Benefit]

**Questions about enrollment?**
• Class schedules and availability
• Tuition and payment options
• What to expect in ongoing classes
• Our family-friendly policies

[ENROLL NOW BUTTON]

Or simply reply to this email or call [Phone Number] to discuss.

**Not quite ready?** 
That's okay too! Feel free to reach out when you're ready to take the next step.

Thanks for choosing [Gym Name] for [Student Name]'s gymnastics journey!

Best regards,
[Your Name]
[Gym Name]

P.S. Don't forget - spots in our popular classes fill up quickly, especially for [Student Name]'s age group!`,
        stage: 'follow-up',
        variables: ['Parent Name', 'Student Name', 'Instructor Name', 'Positive Feedback', 'Recommended Class', 'Class Schedule', 'Tuition Amount', 'Deadline', 'Enrollment Bonus', 'Additional Benefit', 'Phone Number', 'Your Name', 'Gym Name'],
        openRate: 0,
        clickRate: 0,
        conversionRate: 0,
        lastUsed: new Date()
      }
    ]);
  }, []);

  const scriptCategories = [
    { id: 'all', label: 'All Scripts' },
    { id: 'initial-contact', label: 'Initial Contact' },
    { id: 'trial-booking', label: 'Trial Booking' },
    { id: 'trial-follow-up', label: 'Trial Follow-up' },
    { id: 'objection-handling', label: 'Objection Handling' },
    { id: 'conversion', label: 'Conversion' }
  ];

  const filteredScripts = selectedCategory === 'all' 
    ? scripts 
    : scripts.filter(script => script.category === selectedCategory);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // TODO: Show success toast
  };

  const togglePlayback = (id: string) => {
    setIsPlaying(isPlaying === id ? null : id);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Automated Scripts & Templates</h1>
        <p className="text-slate-600">Manage your conversion-optimized scripts and email templates</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('scripts')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'scripts'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Phone className="h-4 w-4 inline mr-2" />
              Phone Scripts
            </button>
            <button
              onClick={() => setActiveTab('emails')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'emails'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Mail className="h-4 w-4 inline mr-2" />
              Email Templates
            </button>
          </div>

          {activeTab === 'scripts' && (
            <div className="flex gap-2">
              {scriptCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scripts Tab */}
      {activeTab === 'scripts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredScripts.length > 0 ? (
            filteredScripts.map((script) => (
              <div key={script.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{script.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {script.category.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-slate-600">
                        Success Rate: {script.successRate}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePlayback(script.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      {isPlaying === script.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {script.content}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Variables:</h4>
                  <div className="flex flex-wrap gap-1">
                    {script.variables.map((variable, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded"
                      >
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {script.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => copyToClipboard(script.content)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm"
                  >
                    <Copy className="h-3 w-3" />
                    Copy
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No scripts found</h3>
              <p className="text-slate-500">Create your first script to get started</p>
            </div>
          )}
        </div>
      )}

      {/* Email Templates Tab */}
      {activeTab === 'emails' && (
        <div className="space-y-6">
          {emailTemplates.length > 0 ? (
            emailTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{template.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">Subject: {template.subject}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {template.stage.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className="text-slate-600">Open Rate: {template.openRate}%</span>
                      <span className="text-slate-600">Click Rate: {template.clickRate}%</span>
                      <span className="text-slate-600">Conversion: {template.conversionRate}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <BarChart3 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {template.content}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Variables:</h4>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map((variable, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded"
                      >
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Last used: {template.lastUsed.toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-1 text-sm">
                      <Zap className="h-3 w-3" />
                      Use Template
                    </button>
                    <button
                      onClick={() => copyToClipboard(template.content)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex items-center gap-1 text-sm"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 mb-2">No email templates found</h3>
              <p className="text-slate-500">Create your first email template to get started</p>
            </div>
          )}
        </div>
      )}

      {/* Performance Insights */}
      <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Automation Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <CheckCircle className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Script Optimization</h4>
            <p className="text-sm opacity-90">Track which scripts perform best and optimize based on success rates</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <Target className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Email Performance</h4>
            <p className="text-sm opacity-90">Monitor open rates, click rates, and conversions for each template</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <Zap className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Automated Triggers</h4>
            <p className="text-sm opacity-90">Set up automated actions based on lead behavior and stage progression</p>
          </div>
        </div>
      </div>
    </div>
  );
};