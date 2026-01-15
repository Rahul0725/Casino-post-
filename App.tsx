
import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import { View, PostData, Template } from './types';
import { TEMPLATES } from './constants';
import { styleText, toBold } from './utils/unicode';
import { generateAiPost } from './services/geminiService';
import { Copy, Check, Info, Trash2, Zap, Send, Sparkles, MessageSquare, Crown, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.BUILDER); // Default to builder as requested
  const [postData, setPostData] = useState<PostData>({
    casinoName: 'Billionaire Casino',
    signupBonus: '₹500',
    wager: '1x',
    minWithdrawal: '₹500',
    paymentType: 'Verified ✅',
    promoLink: '@OffersGod', // Updated default link as requested
    contactId: '@Admin_Loot'
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const [customText, setCustomText] = useState('');

  const copyToClipboard = useCallback((text: string, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      if (window.navigator.vibrate) window.navigator.vibrate(50);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error("Clipboard error:", err);
      alert("Failed to copy. Please try manually selecting text.");
    });
  }, []);

  const handleAiGenerate = async () => {
    if (!postData.casinoName) {
      alert("Please enter a casino name first!");
      return;
    }
    setAiLoading(true);
    const result = await generateAiPost(postData);
    setAiResult(result);
    setAiLoading(false);
  };

  const renderHome = () => (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-white">Top Templates</h2>
        <p className="text-slate-400 text-sm">Pick a base to start your promotion</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {TEMPLATES.slice(0, 10).map((template) => (
          <div key={template.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                  {template.category}
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{template.name}</h3>
              </div>
              {template.isPremium && <Crown size={16} className="text-amber-500" />}
            </div>
            <div className="bg-slate-900 rounded-xl p-3 mb-4 font-mono text-xs text-slate-400 whitespace-pre-wrap line-clamp-4 relative">
              {template.content(postData)}
            </div>
            <button 
              onClick={() => {
                setCurrentView(View.BUILDER);
              }}
              className="w-full py-2 bg-slate-700 hover:bg-blue-600 text-white rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2"
            >
              Edit in Builder <Zap size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBuilder = () => (
    <div className="p-4 space-y-6">
      <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700 space-y-4 shadow-xl">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Zap className="text-blue-500" /> Quick Builder
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Casino Name</label>
            <input 
              value={postData.casinoName}
              onChange={(e) => setPostData({...postData, casinoName: e.target.value})}
              placeholder="e.g. Stake India"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Signup Bonus</label>
            <input 
              value={postData.signupBonus}
              onChange={(e) => setPostData({...postData, signupBonus: e.target.value})}
              placeholder="₹500"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Wager</label>
            <input 
              value={postData.wager}
              onChange={(e) => setPostData({...postData, wager: e.target.value})}
              placeholder="1x"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Min Withdraw</label>
            <input 
              value={postData.minWithdrawal}
              onChange={(e) => setPostData({...postData, minWithdrawal: e.target.value})}
              placeholder="₹500"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Payment</label>
            <input 
              value={postData.paymentType}
              onChange={(e) => setPostData({...postData, paymentType: e.target.value})}
              placeholder="Instant UPI"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Referral Link / Bot ID</label>
            <input 
              value={postData.promoLink}
              onChange={(e) => setPostData({...postData, promoLink: e.target.value})}
              placeholder="@OffersGod"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest">Live Previews</h3>
          <span className="text-[10px] text-slate-600 bg-slate-800 px-2 py-0.5 rounded">Real-time update</span>
        </div>
        
        <div className="space-y-6">
          {TEMPLATES.slice(0, 5).map(temp => (
            <div key={temp.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
              <div className="p-3 px-4 bg-slate-700/30 border-b border-slate-700 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-200">{temp.name}</span>
                <button 
                  onClick={() => copyToClipboard(temp.content(postData), temp.id)}
                  className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-bold ${copiedId === temp.id ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-500 active:scale-90'}`}
                >
                  {copiedId === temp.id ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                </button>
              </div>
              <div className="p-4 font-mono text-sm text-slate-300 whitespace-pre-wrap leading-relaxed min-h-[100px] bg-slate-900/40">
                {temp.content(postData)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAi = () => (
    <div className="p-4 space-y-6">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
          <Sparkles size={80} />
        </div>
        <div className="relative z-10 space-y-4">
          <h2 className="text-2xl font-black">AI Magic Generator</h2>
          <p className="text-indigo-100 text-sm opacity-90">
            Create ultra high-converting posts using Gemini AI. 
            Optimized for maximum click-through rates.
          </p>
          <button 
            disabled={aiLoading}
            onClick={handleAiGenerate}
            className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-95 ${aiLoading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-white text-indigo-600 hover:bg-indigo-50'}`}
          >
            {aiLoading ? (
              <span className="flex items-center gap-2">Generating... <Zap className="animate-pulse" /></span>
            ) : (
              <>GENERATE AI POST <Sparkles size={20} /></>
            )}
          </button>
        </div>
      </div>

      {aiResult && (
        <div className="bg-slate-800 rounded-3xl p-6 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-300 flex items-center gap-2"><Send size={16} /> AI Optimized Post</h3>
            <button 
              onClick={() => copyToClipboard(aiResult, 'ai-out')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${copiedId === 'ai-out' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white active:scale-90'}`}
            >
              {copiedId === 'ai-out' ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Post</>}
            </button>
          </div>
          <div className="bg-slate-900 rounded-2xl p-4 text-slate-300 font-mono text-sm whitespace-pre-wrap border border-slate-800 shadow-inner">
            {aiResult}
          </div>
        </div>
      )}

      {!aiResult && !aiLoading && (
        <div className="text-center py-12 px-8 space-y-4 opacity-40">
          <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare size={32} />
          </div>
          <p className="text-slate-400 text-sm">Fill in the Builder details and click generate to see AI magic!</p>
        </div>
      )}
    </div>
  );

  const renderStyles = () => (
    <div className="p-4 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-black text-white">Unicode Styler</h2>
        <p className="text-slate-400 text-sm">Convert any text to Telegram-bold Unicode</p>
        
        <textarea 
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Type something here to style..."
          className="w-full h-32 bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex justify-between items-center group">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Sans Bold</span>
            <div className="text-lg font-mono text-white mt-1">{toBold(customText || "Sample Text")}</div>
          </div>
          <button 
            onClick={() => copyToClipboard(toBold(customText), 'style-bold')}
            className={`p-3 rounded-xl transition-all ${copiedId === 'style-bold' ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            {copiedId === 'style-bold' ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex justify-between items-center group">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Double Bold</span>
            <div className="text-lg font-mono text-white mt-1">{styleText(customText || "Sample Text", 'double')}</div>
          </div>
          <button 
            onClick={() => copyToClipboard(styleText(customText, 'double'), 'style-double')}
            className={`p-3 rounded-xl transition-all ${copiedId === 'style-double' ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
          >
            {copiedId === 'style-double' ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>
      
      <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 flex gap-3">
        <Info className="text-blue-500 shrink-0" size={20} />
        <p className="text-xs text-blue-300/80 leading-relaxed">
          These fonts are generated using mathematical Unicode characters. They are safe for Telegram, WhatsApp, and IG bios.
        </p>
      </div>
    </div>
  );

  const renderPremium = () => (
    <div className="p-8 space-y-8 flex flex-col items-center text-center h-full justify-center">
      <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-amber-500/20">
        <Crown size={48} className="text-white" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-white">Unlock Pro Features</h2>
        <p className="text-slate-400 max-w-xs mx-auto text-sm">Unlock everything and remove all watermarks from your generated posts.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 w-full">
        <div className="bg-slate-800 p-4 rounded-2xl border border-amber-500/30 text-left flex items-start gap-4">
          <Zap className="text-amber-500 shrink-0" />
          <div>
            <h4 className="font-bold text-white">All 100+ Templates</h4>
            <p className="text-xs text-slate-500">Access exclusive VIP and High-Conversion styles.</p>
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl border border-amber-500/30 text-left flex items-start gap-4">
          <Sparkles className="text-amber-500 shrink-0" />
          <div>
            <h4 className="font-bold text-white">Unlimited AI Generations</h4>
            <p className="text-xs text-slate-500">No daily limits on Gemini AI generation.</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black py-4 rounded-2xl shadow-xl shadow-amber-500/10 transition-all">
        GET PREMIUM - ₹499 / LIFETIME
      </button>
      
      <button 
        onClick={() => setCurrentView(View.HOME)}
        className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-slate-300"
      >
        Maybe Later
      </button>
    </div>
  );

  return (
    <Layout activeView={currentView} onViewChange={setCurrentView}>
      {currentView === View.HOME && renderHome()}
      {currentView === View.BUILDER && renderBuilder()}
      {currentView === View.AI && renderAi()}
      {currentView === View.STYLES && renderStyles()}
      {currentView === View.PREMIUM && renderPremium()}
    </Layout>
  );
};

export default App;
