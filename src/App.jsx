import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Wallet, Plus, Settings, ChevronRight, Search, TrendingUp, CreditCard, X, Camera, Loader2, Sparkles, MessageSquareQuote, PieChart, Landmark, Coins, ArrowRightLeft, Eye, EyeOff, Bell, Share2, CalendarClock, ArrowRight, RefreshCw, Moon, Sun, Smartphone, CheckCircle2, DollarSign, Cloud, Activity, Layers, MinusCircle, Trash2, Briefcase, LineChart, Gift, ArrowUp, ArrowDown, GripVertical, Upload, User, Edit3, AlertTriangle, RotateCcw
} from 'lucide-react';

// ==========================================
// 1. 常量与配置
// ==========================================

const FEEDBACK_QUOTES = [
  "存钱是成年人顶级的自律。", "每一笔支出都是为您想要的生活投票。", "理性消费，感性生活。",
  "财富不是一天的积累，而是每天的坚持。", "种一棵树最好的时间是十年前，其次是现在。",
  "会花钱的人，更会赚钱。", "记账是为了更好地掌控人生。", "积少成多，聚沙成塔。",
  "今天的克制，是为了明天的自由。", "在这个浮躁的世界，保持清醒的财务头脑。", "你不理财，财不理你。",
  "省下的每一分钱，都是未来的底气。", "简单的生活，丰盈的内心。", "消费看需求，而非欲望。",
  "坚持记账，你已经超过了90%的人。"
];

const TYCOON_NAMES = [
  "巴菲特", "查理·芒格", "索罗斯", "洛克菲勒", "沈万三", "胡雪岩", "范蠡", "罗杰斯", "彼得·林奇", "雷·达里奥", "马斯克", "中本聪", "赵长鹏", "孙正义", "李嘉诚"
];

const getRandomTycoonName = () => TYCOON_NAMES[Math.floor(Math.random() * TYCOON_NAMES.length)];

const DEFAULT_BTC_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png";

const AVATARS = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Luffy&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Zoro&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Nami&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Sanji&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Chopper', 
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Robin&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Ace&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Shanks&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Law&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Hancock&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Naruto&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Sasuke&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Sakura&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Kakashi&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Hinata&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Itachi&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Gaara&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Jiraiya&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Tsunade&skinColor=f5d0b0',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Minato&skinColor=f5d0b0',
];

const DEFAULT_CURRENCIES = [
  { code: 'CNY', symbol: '¥', name: '人民币', type: 'fiat', fallbackRate: 1.00 },
  { code: 'USD', symbol: '$', name: '美元', type: 'fiat', fallbackRate: 7.24 },
  { code: 'HKD', symbol: 'HK$', name: '港币', type: 'fiat', fallbackRate: 0.92 },
  { code: 'USDT', symbol: '₮', name: '泰达币', type: 'crypto', coinGeckoId: 'tether', binanceSymbol: 'USDTUSDC', fallbackRate: 7.35 },
  { code: 'USDC', symbol: '$', name: 'USD Coin', type: 'crypto', coinGeckoId: 'usd-coin', binanceSymbol: 'USDCUSDT', fallbackRate: 7.35 },
  { code: 'BTC', symbol: '₿', name: '比特币', type: 'crypto', coinGeckoId: 'bitcoin', binanceSymbol: 'BTCUSDT', fallbackRate: 485000.00 },
  { code: 'ETH', symbol: 'Ξ', name: '以太坊', type: 'crypto', coinGeckoId: 'ethereum', binanceSymbol: 'ETHUSDT', fallbackRate: 23500.00 },
];

const ACCOUNT_TYPES = [
  { id: 'bank', name: '银行卡', icon: '💳', type: 'asset' },
  { id: 'wallet', name: '交易所/钱包', icon: '👛', type: 'asset' },
  { id: 'credit', name: '信用卡', icon: '💳', type: 'liability' },
  { id: 'huabei', name: '花呗', icon: '🐜', type: 'liability' },
  { id: 'crypto', name: '链上钱包', icon: '🪙', type: 'asset' },
  { id: 'cash', name: '现金', icon: '💵', type: 'asset' },
];

// 默认账户：余额重置为 0
const INITIAL_ACCOUNTS_DATA = [
  { id: 'acc_alipay', name: '支付宝', type: 'wallet', balance: 0.00, currency: 'CNY', icon: '🔵', color: 'from-blue-500 to-blue-600' },
  { id: 'acc_wechat', name: '微信钱包', type: 'wallet', balance: 0.00, currency: 'CNY', icon: '🟢', color: 'from-green-500 to-emerald-600' },
  { id: 'acc_huabei', name: '花呗', type: 'huabei', balance: 0.00, currency: 'CNY', icon: '🐜', color: 'from-blue-400 to-blue-500', billDay: 1, repayDay: 10 },
  { id: 'acc_cmb', name: '招商银行', type: 'bank', balance: 0.00, currency: 'CNY', icon: '💳', color: 'from-red-600 to-rose-700' },
  { id: 'acc_abc', name: '农业银行', type: 'bank', balance: 0.00, currency: 'CNY', icon: '💳', color: 'from-emerald-600 to-green-700' },
  { id: 'acc_binance', name: 'Binance', type: 'wallet', balance: 0.00, currency: 'USDT', icon: '🔶', color: 'from-yellow-400 to-yellow-500' },
  { id: 'acc_okx', name: 'OKX', type: 'wallet', balance: 0.00, currency: 'ETH', icon: '⚫', color: 'from-gray-800 to-black' },
];

const EXPENSE_CATEGORIES = [
  { id: 'food', name: '餐饮', icon: '🍜', color: 'bg-orange-400' },
  { id: 'transport', name: '交通', icon: '🚇', color: 'bg-blue-500' },
  { id: 'shopping', name: '购物', icon: '🛍️', color: 'bg-pink-500' },
  { id: 'digital', name: '数字资产', icon: '₿', color: 'bg-purple-500' },
  { id: 'entertainment', name: '娱乐', icon: '🎮', color: 'bg-indigo-500' },
  { id: 'housing', name: '居住', icon: '🏠', color: 'bg-teal-500' },
  { id: 'medical', name: '医疗', icon: '💊', color: 'bg-red-400' },
  { id: 'other', name: '其他', icon: '📝', color: 'bg-gray-400' },
];

const INCOME_CATEGORIES = [
  { id: 'salary', name: '工资', icon: '💼', color: 'bg-blue-600' },
  { id: 'investment', name: '理财', icon: '📈', color: 'bg-red-500' },
  { id: 'bonus', name: '奖金', icon: '🧧', color: 'bg-orange-500' },
  { id: 'parttime', name: '兼职', icon: '⚡', color: 'bg-yellow-500' },
  { id: 'other_income', name: '其他', icon: '💎', color: 'bg-emerald-500' },
];

// --- 2. 工具函数与 Hooks ---

const callGemini = async (prompt, base64Image = null, mimeType = 'image/jpeg') => {
  const apiKey = ""; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  let parts = [{ text: prompt }];
  if (base64Image) parts.push({ inlineData: { mimeType: mimeType, data: base64Image } });
  try {
    const response = await fetch(url, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: parts }] })
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) { return null; }
};

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
          const parsed = JSON.parse(item);
          // 数据完整性自愈逻辑：检查解析后的数据类型是否符合预期
          if (defaultValue === null && parsed !== null) return parsed;
          if (typeof defaultValue === 'string' && typeof parsed !== 'string') return defaultValue;
          if (Array.isArray(defaultValue) && !Array.isArray(parsed)) return defaultValue;
          if (typeof defaultValue === 'object' && !Array.isArray(defaultValue) && (typeof parsed !== 'object' || Array.isArray(parsed))) return defaultValue;
          return parsed;
      }
      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) { console.error(error); }
  }, [key, state]);

  return [state, setState];
}

function useTheme() {
    const [theme, setTheme] = usePersistedState('app_theme', 'system'); 
    useEffect(() => {
        const root = window.document.documentElement;
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
        const applyTheme = () => {
            if (theme === 'dark' || (theme === 'system' && systemDark.matches)) root.classList.add('dark');
            else root.classList.remove('dark');
        };
        applyTheme();
        systemDark.addEventListener('change', applyTheme);
        return () => systemDark.removeEventListener('change', applyTheme);
    }, [theme]);
    return [theme, setTheme];
}

// ==========================================
// 3. 基础 UI 组件 (必须在 App 之前定义)
// ==========================================

function ScanningOverlay({ isVisible }) {
  if (!isVisible) return null;
  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
      <div className="relative w-64 h-64 border-2 border-white/20 rounded-[2rem] overflow-hidden mb-8 shadow-2xl shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent animate-scan-y"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,1)] animate-scan-line"></div>
      </div>
      <div className="flex flex-col items-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-4" />
        <p className="text-lg font-bold tracking-wide">Gemini 正在分析...</p>
        <p className="text-sm text-white/50 mt-2 font-medium">智能识别金额、商户与日期</p>
      </div>
      <style jsx>{`@keyframes scan-line { 0% { top: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } } .animate-scan-line { animation: scan-line 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }`}</style>
    </div>
  );
}

function TabIcon({ icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center space-y-1.5 w-16 transition-all duration-300 ${isActive ? 'text-black dark:text-white scale-105' : 'text-gray-400 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-500'}`}>
      {icon}
      <span className="text-[10px] font-bold tracking-wide">{label}</span>
    </button>
  );
}

function TabBar({ activeTab, setActiveTab, onAdd }) {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[92px] bg-white/80 dark:bg-[#000000]/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 flex justify-around items-start pt-4 z-50 pb-8 transition-colors duration-300">
      <TabIcon icon={<Wallet size={24} strokeWidth={2.5} />} label="账单" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
      <TabIcon icon={<Landmark size={24} strokeWidth={2.5} />} label="资产" isActive={activeTab === 'assets'} onClick={() => setActiveTab('assets')} />
      <div className="relative -top-8 group">
        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity rounded-full"></div>
        <button onClick={onAdd} className="relative w-16 h-16 bg-black dark:bg-white rounded-full text-white dark:text-black flex items-center justify-center shadow-2xl shadow-blue-500/20 transform transition-all duration-300 active:scale-90 hover:-translate-y-1"><Plus size={32} strokeWidth={3} /></button>
      </div>
      <TabIcon icon={<PieChart size={24} strokeWidth={2.5} />} label="统计" isActive={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
      <TabIcon icon={<Settings size={24} strokeWidth={2.5} />} label="设置" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
    </div>
  );
}

function TransactionItem({ transaction, isLast }) {
  const isExpense = transaction.type === 'expense';
  const isIncome = transaction.type === 'income';
  let category = EXPENSE_CATEGORIES.find(c => c.name === transaction.category);
  if (isIncome) category = INCOME_CATEGORIES.find(c => c.name === transaction.category) || INCOME_CATEGORIES[4];
  else category = category || EXPENSE_CATEGORIES[7];

  const isCrypto = ['BTC', 'ETH', 'USDT', 'USDC'].includes(transaction.currency);
  const isTransfer = transaction.type === 'transfer';

  if (isTransfer) {
     return (
        <div className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-default group ${!isLast ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}>
            <div className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-300 text-lg mr-4 shrink-0`}><ArrowRightLeft size={18} /></div>
             <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{transaction.category || '转账还款'}</h4>
                <span className="font-bold text-gray-900 dark:text-white text-sm font-mono">¥{transaction.cnyAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{transaction.note || '账户互转'}</div>
            </div>
        </div>
     )
  }

  return (
    <div className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-default group ${!isLast ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}>
      <div className={`w-10 h-10 rounded-xl ${category?.color || 'bg-gray-400'} flex items-center justify-center text-white text-lg mr-4 shadow-md shadow-gray-200 dark:shadow-none`}>{category?.icon || '📝'}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">{transaction.category}</h4>
          <span className={`font-bold text-sm font-mono ${isIncome ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
            {isExpense ? '-' : '+'}¥{transaction.cnyAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400 dark:text-gray-500">
          <span className="truncate pr-2">{transaction.note || '无备注'}</span>
          <span className={`font-medium ${isCrypto ? 'text-blue-500 dark:text-blue-400' : ''}`}>{transaction.amount} {transaction.currency}</span>
        </div>
      </div>
    </div>
  );
}

function AccountItem({ account, hidden, rates, isEditing, onDelete }) {
    const rate = rates[account.currency] || 1;
    const cnyVal = account.balance * rate;
    const isLiability = ['credit', 'huabei'].includes(account.type);

    return (
        <div className="flex items-center p-4 pr-5 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group cursor-default relative overflow-hidden">
            <div className={`flex items-center transition-all duration-300 overflow-hidden ${isEditing ? 'w-10 mr-2 opacity-100' : 'w-0 mr-0 opacity-0'}`}>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-sm active:scale-90 transition-transform"><MinusCircle size={18} /></button>
            </div>
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${account.color} flex items-center justify-center text-white text-xl shadow-lg shadow-gray-200/50 dark:shadow-none mr-4 shrink-0 relative z-10 transition-transform duration-300`}>
                {account.icon}
                <div className="absolute inset-0 bg-white/20 rounded-2xl transform -skew-x-12 -translate-x-4"></div>
            </div>
            <div className="flex-1 relative z-10">
                <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-gray-900 dark:text-white text-sm tracking-tight">{account.name}</span>
                    <span className={`font-bold font-mono tracking-tight ${isLiability && account.balance < 0 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{hidden ? '****' : `${account.currency} ${account.balance.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 dark:text-gray-500 font-medium">{account.type.toUpperCase()}</span>
                    <span className="text-gray-400 dark:text-gray-500 font-medium">{hidden ? '****' : `≈ ¥${Math.abs(cnyVal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                </div>
            </div>
        </div>
    )
}

function SettingItem({ label, value, isLast, toggle, checked, onToggle, icon, onClick }) {
  return (
    <div className={`flex items-center justify-between p-5 ${!isLast ? 'border-b border-gray-50 dark:border-gray-800' : ''} active:bg-gray-50 dark:active:bg-gray-800 transition-colors cursor-pointer group`} onClick={toggle ? onToggle : onClick}>
      <div className="flex items-center space-x-4">
          {icon && <div className="text-gray-400 group-hover:text-blue-500 transition-colors bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">{icon}</div>}
          <span className="text-sm font-bold text-gray-700 dark:text-gray-200">{label}</span>
      </div>
      {toggle ? (
        <div className={`w-12 h-7 rounded-full relative shadow-inner transition-colors duration-300 ease-in-out ${checked ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out ${checked ? 'translate-x-6 left-0.5' : 'left-1'}`}></div>
        </div>
      ) : (
        <div className="flex items-center text-gray-400">
          <span className="text-xs font-medium mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">{value}</span>
          <ChevronRight size={16} />
        </div>
      )}
    </div>
  );
}

// --- 4. 模态框组件 ---

function AddAccountModal({ onClose, onSave, currencies }) {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [type, setType] = useState(ACCOUNT_TYPES[0]);
    const [currency, setCurrency] = useState(currencies[0]);
    const isCredit = ['credit', 'huabei'].includes(type.id);

    const handleSave = () => {
        if (!name || balance === '') return;
        let finalBalance = parseFloat(balance);
        if (isCredit && finalBalance > 0) finalBalance = -finalBalance;
        
        let color = 'from-gray-500 to-gray-600';
        if (type.id === 'bank') color = 'from-blue-600 to-blue-700';
        if (type.id === 'wallet') color = 'from-purple-600 to-purple-700';
        if (type.id === 'credit') color = 'from-indigo-600 to-indigo-700';
        if (type.id === 'huabei') color = 'from-blue-400 to-blue-500';
        if (type.id === 'crypto') color = 'from-orange-500 to-red-500';

        onSave({
            id: `acc-${Date.now()}`, name, balance: finalBalance, type: type.id, currency: currency.code,
            icon: type.icon, color: color,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:bg-black/20">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" onClick={onClose}></div>
            <div className="bg-[#F2F2F7] dark:bg-[#1C1C1E] w-full sm:w-[400px] rounded-t-[2rem] sm:rounded-3xl p-6 z-10 space-y-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
                <div className="flex justify-between items-center">
                    <button onClick={onClose} className="text-blue-600 dark:text-blue-400 font-medium">取消</button>
                    <h3 className="font-bold text-lg dark:text-white">添加账户</h3>
                    <button onClick={handleSave} className="text-blue-600 dark:text-blue-400 font-bold disabled:opacity-30" disabled={!name}>完成</button>
                </div>
                <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl p-4 shadow-sm space-y-4">
                    <input className="w-full text-lg outline-none border-b border-gray-100 dark:border-gray-700 pb-2 bg-transparent dark:text-white font-medium" placeholder="账户名称" value={name} onChange={e => setName(e.target.value)} autoFocus />
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                         {ACCOUNT_TYPES.map(t => (
                             <button key={t.id} onClick={() => setType(t)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${type.id === t.id ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}><span className="mr-1">{t.icon}</span> {t.name}</button>
                         ))}
                    </div>
                    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                        <select value={currency.code} onChange={e => setCurrency(currencies.find(c => c.code === e.target.value))} className="bg-transparent dark:text-white rounded-lg p-2 text-sm outline-none font-bold">
                            {currencies.map(c => <option key={c.code} value={c.code} className="dark:text-black">{c.code}</option>)}
                        </select>
                        <input type="number" className="flex-1 text-right text-2xl font-bold font-mono outline-none bg-transparent placeholder:text-gray-300 dark:text-white" placeholder="0.00" value={balance} onChange={e => setBalance(e.target.value)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function AddTransactionModal({ onClose, onSave, accounts = [], rates = {}, currencies = [], defaultAccountId, onReset }) {
  const [mode, setMode] = useState('expense'); 
  const [amount, setAmount] = useState('');
  
  const [currency, setCurrency] = useState(currencies && currencies.length > 0 ? currencies[0] : null); 
  const [rate, setRate] = useState(1);
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  
  const [selectedAccount, setSelectedAccount] = useState(
      (accounts && accounts.length > 0) 
        ? (accounts.find(a => a.id === defaultAccountId) || accounts[0]) 
        : null
  );
  
  const [toAccount, setToAccount] = useState(
      (accounts && accounts.length > 1) 
        ? (accounts.find(a => a.id !== accounts[0]?.id) || null) 
        : null
  );

  useEffect(() => {
      if (mode === 'expense') setCategory(EXPENSE_CATEGORIES[0]);
      if (mode === 'income') setCategory(INCOME_CATEGORIES[0]);
  }, [mode]);

  useEffect(() => {
    if (currency && rates && rates[currency.code]) {
        setRate(rates[currency.code]);
    }
  }, [currency, rates]);

  const safeAmount = parseFloat(amount || 0);
  const estimatedCNY = (safeAmount * parseFloat(rate || 0)).toFixed(2);
  const isRepayment = toAccount && ['credit', 'huabei'].includes(toAccount.type);
  
  const handleSave = () => {
    if (!amount) return;
    onSave({
      id: Date.now(), type: mode, amount: safeAmount, currency: currency?.code, rate: parseFloat(rate),
      cnyAmount: parseFloat(estimatedCNY), category: mode === 'transfer' ? (isRepayment ? '还款' : '转账') : category.name, note, date: new Date(date).toISOString(),
      accountId: selectedAccount?.id, fromAccountId: mode === 'transfer' ? selectedAccount?.id : null, toAccountId: mode === 'transfer' ? toAccount?.id : null,
    });
  };

  if (!currency || !selectedAccount) {
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md">
            <div className="bg-white dark:bg-[#1C1C1E] p-6 rounded-2xl flex flex-col items-center shadow-2xl max-w-xs text-center">
                <AlertTriangle size={32} className="text-orange-500 mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">数据初始化异常</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">未能加载账户或币种信息。请尝试重置数据。</p>
                <div className="flex gap-3 w-full">
                    <button onClick={onClose} className="flex-1 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300">取消</button>
                    <button onClick={onReset} className="flex-1 py-2 rounded-xl bg-red-500 text-white text-xs font-bold flex items-center justify-center gap-1"><RotateCcw size={12} /> 重置数据</button>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:bg-black/20">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="bg-[#F2F2F7] dark:bg-[#1C1C1E] w-full sm:w-[400px] h-[92vh] sm:h-auto sm:max-h-[90vh] sm:rounded-2xl rounded-t-[2rem] flex flex-col relative z-10 transition-transform duration-300 ease-out translate-y-0 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10">
        <div className="bg-white/80 dark:bg-[#2C2C2E]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800 p-2 flex justify-center">
            <div className="bg-gray-200/50 dark:bg-black/30 p-1 rounded-xl flex space-x-1">
                {['expense', 'income', 'transfer'].map(m => (
                    <button key={m} onClick={() => setMode(m)} className={`px-6 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === m ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{m === 'expense' ? '支出' : m === 'income' ? '收入' : (isRepayment && mode === 'transfer' ? '还款' : '内部转账')}</button>
                ))}
            </div>
        </div>
        <div className="flex justify-between items-center px-6 py-4 bg-white/50 dark:bg-[#2C2C2E]/50 backdrop-blur-xl">
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 font-bold text-sm">取消</button>
          <button onClick={handleSave} className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-sm font-bold disabled:opacity-30 shadow-lg shadow-gray-500/20" disabled={!amount}>保存</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-white dark:bg-[#2C2C2E] rounded-3xl p-6 shadow-sm border border-gray-100/50 dark:border-gray-700">
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">金额 ({currency.code})</span>
                {currency.code !== 'CNY' && <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-md">≈ ¥{estimatedCNY}</span>}
             </div>
             <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-400 pb-1">{currency.symbol}</span>
                <input type="number" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className={`w-full text-5xl font-black placeholder-gray-200 dark:placeholder-gray-700 outline-none bg-transparent ${mode === 'income' ? 'text-green-500' : 'text-gray-900 dark:text-white'}`} autoFocus />
             </div>
          </div>
          {mode === 'transfer' ? (
              <div className="bg-white dark:bg-[#2C2C2E] rounded-3xl overflow-hidden shadow-sm p-5 border border-gray-100/50 dark:border-gray-700 flex items-center gap-4">
                 <div className="flex-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">转出</label>
                     <select className="w-full bg-gray-50 dark:bg-black/20 p-3 rounded-2xl outline-none font-bold text-gray-900 dark:text-white appearance-none" value={selectedAccount?.id} onChange={e => setSelectedAccount(accounts.find(a => a.id === e.target.value))}>
                         {accounts.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                     </select>
                 </div>
                 <ArrowRight className="text-gray-300 mt-5" />
                 <div className="flex-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">转入/还款</label>
                     <select className="w-full bg-gray-50 dark:bg-black/20 p-3 rounded-2xl outline-none font-bold text-gray-900 dark:text-white appearance-none" value={toAccount?.id || ''} onChange={e => setToAccount(accounts.find(a => a.id === e.target.value))}>
                         {accounts.filter(a => a.id !== selectedAccount?.id).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                     </select>
                 </div>
              </div>
          ) : (
             <>
               <div className="bg-white dark:bg-[#2C2C2E] rounded-3xl overflow-hidden shadow-sm p-5 border border-gray-100/50 dark:border-gray-700">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">币种</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {currencies.map(c => (
                            <button key={c.code} onClick={() => setCurrency(c)} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${currency.code === c.code ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>{c.code}</button>
                        ))}
                    </div>
               </div>
              <div className="bg-white dark:bg-[#2C2C2E] rounded-3xl overflow-hidden shadow-sm p-5 border border-gray-100/50 dark:border-gray-700">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">{mode === 'income' ? '入账账户' : '支付账户'}</label>
                 <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                     {accounts.map(acc => (
                         <button key={acc.id} onClick={() => setSelectedAccount(acc)} className={`flex flex-col items-center p-3 rounded-2xl border min-w-[90px] transition-all duration-200 ${selectedAccount?.id === acc.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                            <span className="text-2xl mb-2">{acc.icon}</span>
                            <span className={`text-xs font-bold truncate w-full text-center ${selectedAccount?.id === acc.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>{acc.name}</span>
                         </button>
                     ))}
                 </div>
              </div>
              <div className="bg-white dark:bg-[#2C2C2E] rounded-3xl p-6 shadow-sm border border-gray-100/50 dark:border-gray-700 grid grid-cols-4 gap-y-6 gap-x-2">
                  {(mode === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(c => (
                      <button key={c.id} onClick={() => setCategory(c)} className="flex flex-col items-center space-y-2 group">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 ${category.id === c.id ? `${c.color} text-white scale-110 shadow-lg` : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>{c.icon}</div>
                          <span className={`text-[10px] font-bold ${category.id === c.id ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{c.name}</span>
                      </button>
                  ))}
              </div>
             </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 5. 视图组件 ---

function HomeView({ transactions, totalExpense, userAvatar, userNickname }) {
  const [aiInsight, setAiInsight] = useState(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const groupedTransactions = useMemo(() => {
    const groups = {};
    transactions.forEach(t => {
      const date = new Date(t.date).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
      if (!groups[date]) groups[date] = [];
      groups[date].push(t);
    });
    return groups;
  }, [transactions]);

  const handleGenerateInsight = async () => {
    if (loadingInsight) return;
    setLoadingInsight(true);
    setAiInsight(null);
    const prompt = `As a witty financial advisor, analyze these expenses: ${JSON.stringify(transactions.slice(0, 10))}. Provide a very short (max 25 words), personalized insight in Chinese.`;
    const result = await callGemini(prompt);
    setAiInsight(result);
    setLoadingInsight(false);
  };

  return (
    <div className="px-5 pt-4 animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wider flex items-center">
             <span>你好, {typeof userNickname === 'string' ? userNickname : '金融大亨'}</span>
          </h2>
          <h1 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white drop-shadow-sm">
            ¥{totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h1>
        </div>
        <div className="flex flex-col items-center gap-2">
             <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white dark:border-[#2C2C2E] shadow-xl shadow-blue-500/10 transition-transform hover:scale-105 active:scale-95 bg-gray-100 dark:bg-gray-800">
                <img src={typeof userAvatar === 'string' ? userAvatar : DEFAULT_BTC_AVATAR} alt="User" className="w-full h-full object-cover" />
             </div>
             <button onClick={handleGenerateInsight} className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/30 active:scale-90 transition-all">
                {loadingInsight ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
             </button>
        </div>
      </div>
      {aiInsight && (
        <div className="mb-8 bg-white/60 dark:bg-[#1C1C1E]/60 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-indigo-500/5 border border-white/40 dark:border-white/5 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 opacity-80">
                <MessageSquareQuote size={16} className="text-indigo-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">AI 洞察</span>
            </div>
            <p className="text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-200">{aiInsight}</p>
          </div>
          <button onClick={() => setAiInsight(null)} className="absolute top-4 right-4 opacity-30 hover:opacity-100 transition-opacity"><X size={16}/></button>
        </div>
      )}
      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input type="text" placeholder="搜索账单..." className="w-full bg-white dark:bg-[#1C1C1E] rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium shadow-sm shadow-gray-200/50 dark:shadow-none border border-transparent focus:border-blue-500/20 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 dark:text-white placeholder-gray-400" />
      </div>
      <div className="space-y-6 pb-8">
        {Object.entries(groupedTransactions).map(([date, list]) => (
          <div key={date} className="animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards">
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-600 mb-3 pl-2 uppercase tracking-wider flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700"></div>{date}</h3>
            <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-sm shadow-gray-200/50 dark:shadow-none border border-gray-100/50 dark:border-gray-800/50">
              {list.map((t, index) => <TransactionItem key={t.id} transaction={t} isLast={index === list.length - 1} />)}
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-300 dark:text-gray-700"><Wallet size={64} strokeWidth={1} className="mb-4 opacity-50" /><p className="font-medium">暂无记录</p></div>
        )}
      </div>
    </div>
  );
}

function AssetsView({ accounts, onAddAccount, onDeleteAccount, rates, currencies, lastUpdated, source }) {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const totalAssetsCNY = useMemo(() => {
    if (!accounts) return 0;
    return accounts.reduce((sum, acc) => {
      const rate = rates[acc.currency] || 1;
      return sum + (acc.balance * rate); 
    }, 0);
  }, [accounts, rates]);

  const updatedTimeStr = lastUpdated ? new Date(lastUpdated).toLocaleTimeString('zh-CN', {hour: '2-digit', minute: '2-digit'}) : '--:--';

  return (
    <div className="px-5 pt-4 animate-in fade-in duration-500">
      <div className="relative mb-10">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
            净资产估值
            <button onClick={() => setIsPrivacyMode(!isPrivacyMode)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"><EyeOff size={14} /></button>
          </h2>
          <div className="flex gap-2">
              <button onClick={() => setIsEditing(!isEditing)} className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${isEditing ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-blue-600 dark:text-blue-400 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}>{isEditing ? '完成' : '编辑'}</button>
              <button onClick={() => setShowAddAccount(true)} className="text-white font-bold text-xs bg-black dark:bg-white dark:text-black px-4 py-1.5 rounded-full hover:scale-105 active:scale-95 transition-transform">+ 账户</button>
          </div>
        </div>
        <div className="flex flex-col relative">
            <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2 drop-shadow-sm">
                {isPrivacyMode ? '****' : `¥${totalAssetsCNY.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </h1>
            <div className="flex items-center gap-2">
               <p className="text-[10px] text-gray-400 dark:text-gray-600 flex items-center opacity-80"><RefreshCw size={10} className="mr-1" /> 汇率: {source} (更新于 {updatedTimeStr})</p>
            </div>
        </div>
      </div>
      <div className="space-y-8 pb-8">
        {['bank', 'wallet', 'crypto', 'credit'].map(typeGroup => {
            const groupAccounts = (accounts || []).filter(a => {
                if (typeGroup === 'credit') return ['credit', 'huabei'].includes(a.type);
                return a.type === typeGroup || (typeGroup === 'bank' && a.type === 'cash');
            });
            if (groupAccounts.length === 0) return null;
            let title = "资金账户";
            if (typeGroup === 'wallet') title = "交易所/钱包";
            if (typeGroup === 'crypto') title = "链上资产";
            if (typeGroup === 'credit') title = "信用负债";
            return (
                <div key={typeGroup}>
                    <h3 className={`text-xs font-bold mb-3 pl-2 uppercase tracking-wider flex items-center gap-2 ${typeGroup === 'credit' ? 'text-red-500' : 'text-gray-400 dark:text-gray-600'}`}>{typeGroup === 'credit' && <Activity size={12} />}{title}</h3>
                    <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden shadow-sm shadow-gray-200/50 dark:shadow-none border border-gray-100/50 dark:border-gray-800/50 divide-y divide-gray-50 dark:divide-gray-800/50">
                        {groupAccounts.map(acc => <AccountItem key={acc.id} account={acc} hidden={isPrivacyMode} rates={rates} isEditing={isEditing} onDelete={() => onDeleteAccount(acc.id)} />)}
                    </div>
                </div>
            )
        })}
      </div>
      {showAddAccount && <AddAccountModal onClose={() => setShowAddAccount(false)} onSave={onAddAccount} currencies={currencies} />}
    </div>
  );
}

function StatsView({ transactions, accounts, rates }) {
    const [distributionType, setDistributionType] = useState('type'); 
    const expenseData = useMemo(() => {
        const catMap = {};
        let total = 0;
        transactions.filter(t => t.type === 'expense').forEach(t => {
            if (!catMap[t.category]) catMap[t.category] = 0;
            catMap[t.category] += t.cnyAmount;
            total += t.cnyAmount;
        });
        return Object.entries(catMap)
            .map(([name, value]) => ({ name, value, percent: total > 0 ? (value / total) * 100 : 0, color: EXPENSE_CATEGORIES.find(c => c.name === name)?.color || 'bg-gray-400' }))
            .sort((a, b) => b.value - a.value);
    }, [transactions]);

    const assetTypeData = useMemo(() => {
        const typeMap = {};
        let total = 0;
        (accounts || []).forEach(acc => {
             if (acc.balance > 0) {
                 const rate = rates[acc.currency] || 1;
                 const cnyVal = acc.balance * rate;
                 const typeName = acc.type === 'crypto' ? 'Crypto' : (acc.type === 'wallet' ? 'Exchange' : 'Bank');
                 if (!typeMap[typeName]) typeMap[typeName] = 0;
                 typeMap[typeName] += cnyVal;
                 total += cnyVal;
             }
        });
        return Object.entries(typeMap)
            .map(([name, value]) => ({
                name, value, percent: total > 0 ? (value / total) * 100 : 0,
                color: name === 'Crypto' ? 'bg-purple-500' : (name === 'Exchange' ? 'bg-blue-500' : 'bg-emerald-500')
            }))
            .sort((a, b) => b.value - a.value);
    }, [accounts, rates]);

    const assetCurrencyData = useMemo(() => {
        const curMap = {};
        let total = 0;
        (accounts || []).forEach(acc => {
             if (acc.balance > 0) {
                 const rate = rates[acc.currency] || 1;
                 const cnyVal = acc.balance * rate;
                 const curName = acc.currency;
                 if (!curMap[curName]) curMap[curName] = 0;
                 curMap[curName] += cnyVal;
                 total += cnyVal;
             }
        });
        const CUR_COLORS = { 'CNY': 'bg-red-500', 'USD': 'bg-green-500', 'HKD': 'bg-teal-600', 'BTC': 'bg-orange-500', 'ETH': 'bg-indigo-500', 'USDT': 'bg-emerald-500', 'USDC': 'bg-blue-500' };
        return Object.entries(curMap)
            .map(([name, value]) => ({
                name, value, percent: total > 0 ? (value / total) * 100 : 0,
                color: CUR_COLORS[name] || 'bg-gray-400'
            }))
            .sort((a, b) => b.value - a.value);
    }, [accounts, rates]);

    const currentAssetData = distributionType === 'type' ? assetTypeData : assetCurrencyData;

  return (
    <div className="px-5 pt-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black mb-8 tracking-tight text-gray-900 dark:text-white">财富报表</h1>
      <div className="bg-gradient-to-br from-gray-900 to-black dark:from-[#1C1C1E] dark:to-black rounded-[2rem] p-6 shadow-2xl shadow-gray-900/20 mb-8 relative overflow-hidden transition-all duration-500">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2"><Layers size={14} /> 资产分布</h3>
              <div className="flex bg-white/10 rounded-lg p-0.5 backdrop-blur-sm">
                  <button onClick={() => setDistributionType('type')} className={`text-[10px] px-2 py-1 rounded-md font-bold transition-all ${distributionType === 'type' ? 'bg-white text-black shadow-sm' : 'text-white/60 hover:text-white'}`}>类型</button>
                  <button onClick={() => setDistributionType('currency')} className={`text-[10px] px-2 py-1 rounded-md font-bold transition-all ${distributionType === 'currency' ? 'bg-white text-black shadow-sm' : 'text-white/60 hover:text-white'}`}>币种</button>
              </div>
          </div>
          <div className="flex items-center justify-center py-4 relative z-10">
              <div className="relative w-40 h-40">
                  <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                      {currentAssetData.map((item, i) => {
                          const offset = currentAssetData.slice(0, i).reduce((acc, cur) => acc + cur.percent, 0);
                          const dashArray = `${item.percent} ${100 - item.percent}`;
                          let color = '#9ca3af';
                          if (item.color.includes('purple')) color = '#a855f7'; if (item.color.includes('blue')) color = '#3b82f6'; if (item.color.includes('emerald')) color = '#10b981'; if (item.color.includes('red')) color = '#ef4444'; if (item.color.includes('green')) color = '#22c55e'; if (item.color.includes('orange')) color = '#f97316'; if (item.color.includes('indigo')) color = '#6366f1'; if (item.color.includes('teal')) color = '#0d9488';
                          return (<circle key={i} r="40" cx="50" cy="50" fill="transparent" stroke={color} strokeWidth="12" strokeDasharray={dashArray} strokeDashoffset={-offset} className="transition-all duration-1000 ease-out" />)
                      })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">100%</div>
              </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 relative z-10">
              {currentAssetData.slice(0, 6).map((d, i) => (
                  <div key={i} className="text-center p-2 bg-white/5 rounded-xl backdrop-blur-sm">
                      <div className={`w-2 h-2 rounded-full ${d.color} mx-auto mb-1`}></div>
                      <div className="text-white/60 text-[10px] uppercase truncate">{d.name}</div>
                      <div className="text-white font-bold text-xs">{d.percent.toFixed(0)}%</div>
                  </div>
              ))}
          </div>
      </div>
      <div className="bg-white dark:bg-[#1C1C1E] rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">本月支出 Top 5</h3>
          <div className="space-y-4">
              {expenseData.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="relative">
                      <div className="flex justify-between items-center mb-1 z-10 relative text-sm">
                          <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${item.color}`}></div> {item.name}</span>
                          <span className="font-mono font-medium text-gray-900 dark:text-white">¥{item.value.toFixed(0)}</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}

function SettingsView({ userAvatar, setUserAvatar, userNickname, setUserNickname, theme, setTheme, currencies, onAddCurrency, settings, setSettings, accounts, onReorderAccounts, onReset }) {
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);
    const [isAddingCurrency, setIsAddingCurrency] = useState(false);
    const [newCurrencyCode, setNewCurrencyCode] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(userNickname);
    const fileInputRef = useRef(null);

    const handleAddCurr = () => {
        if(newCurrencyCode) {
            onAddCurrency({ code: newCurrencyCode.toUpperCase(), symbol: newCurrencyCode.toUpperCase(), name: newCurrencyCode.toUpperCase(), type: 'crypto', coinGeckoId: newCurrencyCode.toLowerCase(), fallbackRate: 1 });
            setIsAddingCurrency(false);
            setNewCurrencyCode('');
        }
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNameSave = () => {
        setUserNickname(tempName);
        setIsEditingName(false);
    }

  return (
    <div className="px-5 pt-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-black mb-8 tracking-tight text-gray-900 dark:text-white">偏好设置</h1>
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 flex items-center mb-8 shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden">
         <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
         <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden mr-4 border-2 border-white dark:border-gray-700 shadow-lg relative z-10 cursor-pointer group" onClick={() => setShowAvatarSelector(!showAvatarSelector)}>
            <img src={typeof userAvatar === 'string' ? userAvatar : DEFAULT_BTC_AVATAR} alt="User" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Camera size={16} className="text-white" /></div>
         </div>
         <div className="flex-1 z-10">
             {isEditingName ? (
                 <div className="flex items-center gap-2">
                     <input value={tempName} onChange={(e) => setTempName(e.target.value)} className="bg-gray-100 dark:bg-black/30 rounded-lg px-2 py-1 text-lg font-bold text-gray-900 dark:text-white w-full outline-none" autoFocus />
                     <button onClick={handleNameSave} className="bg-blue-500 text-white p-1.5 rounded-lg"><CheckCircle2 size={16}/></button>
                 </div>
             ) : (
                 <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingName(true)}>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{typeof userNickname === 'string' ? userNickname : '大亨'}</h3>
                    <Edit3 size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
             )}
             <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">金融大亨</p>
         </div>
      </div>

      {showAvatarSelector && (
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 mb-6 shadow-lg border border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-4">
              <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">更换头像</h4>
                  <button onClick={() => fileInputRef.current.click()} className="flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full"><Upload size={12} className="mr-1.5" /> 上传图片</button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarUpload} />
              </div>
              <div className="grid grid-cols-5 gap-3 max-h-60 overflow-y-auto no-scrollbar">
                  <button onClick={() => { setUserAvatar(DEFAULT_BTC_AVATAR); setShowAvatarSelector(false); }} className="flex flex-col items-center space-y-1 group"><div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-transparent bg-gray-50 dark:bg-gray-800 p-2"><img src={DEFAULT_BTC_AVATAR} alt="BTC" className="w-full h-full object-cover" /></div></button>
                  {AVATARS.map((url, idx) => {
                      const seed = url.match(/seed=([^&]+)/)?.[1] || 'User';
                      return (<button key={idx} onClick={() => { setUserAvatar(url); setShowAvatarSelector(false); }} className={`flex flex-col items-center space-y-1 group`}><div className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${userAvatar === url ? 'border-blue-500 scale-110 shadow-md' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700 bg-gray-50 dark:bg-gray-800'}`}><img src={url} alt={seed} className="w-full h-full object-cover" /></div><span className="text-[9px] text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">{seed}</span></button>)
                  })}
              </div>
          </div>
      )}

      <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-100 dark:border-gray-800 p-1.5 flex">
           {['light', 'system', 'dark'].map(t => (
               <button key={t} onClick={() => setTheme(t)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-300 ${theme === t ? 'bg-black dark:bg-white text-white dark:text-black shadow-md' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>{t === 'light' && <Sun size={14} />}{t === 'system' && <Smartphone size={14} />}{t === 'dark' && <Moon size={14} />}<span className="capitalize">{t === 'system' ? '自动' : (t === 'light' ? '浅色' : '深色')}</span></button>
           ))}
      </div>

      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-5 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center space-x-3"><div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg text-gray-400"><Briefcase size={18} /></div><span className="text-sm font-bold text-gray-700 dark:text-gray-200">账户管理 (排序)</span></div>
          </div>
          <div className="max-h-64 overflow-y-auto">
              {(accounts || []).map((acc, idx) => (
                  <div key={acc.id} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
                      <div className="flex items-center space-x-3"><div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${acc.color} flex items-center justify-center text-white text-sm`}>{acc.icon}</div><span className="text-sm font-bold text-gray-800 dark:text-gray-200">{acc.name}</span></div>
                      <div className="flex space-x-2">
                          <button onClick={() => onReorderAccounts(idx, 'up')} disabled={idx === 0} className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700"><ArrowUp size={14} /></button>
                          <button onClick={() => onReorderAccounts(idx, 'down')} disabled={idx === (accounts?.length || 0) - 1} className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 disabled:opacity-30 hover:bg-gray-200 dark:hover:bg-gray-700"><ArrowDown size={14} /></button>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden mb-6 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="p-5 border-b border-gray-50 dark:border-gray-800">
            <div className="flex items-center space-x-4 mb-3"><div className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg text-gray-400"><Wallet size={18} /></div><span className="text-sm font-bold text-gray-700 dark:text-gray-200">默认扣款账户</span></div>
            <select className="w-full bg-gray-50 dark:bg-black/20 rounded-xl p-2 text-sm outline-none dark:text-white font-medium" value={settings.defaultAccountId} onChange={(e) => setSettings({...settings, defaultAccountId: e.target.value})}>
                {(accounts || []).map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
            </select>
        </div>
        <SettingItem label="多币种管理" value={`${(currencies || []).length}种`} icon={<Coins size={18} />} onClick={() => setIsAddingCurrency(!isAddingCurrency)} />
        {isAddingCurrency && (
            <div className="px-4 pb-4 flex gap-2 animate-in slide-in-from-top-2">
                <input className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2 text-sm outline-none dark:text-white" placeholder="输入币种代码 (如 DOGE)" value={newCurrencyCode} onChange={e => setNewCurrencyCode(e.target.value)} />
                <button onClick={handleAddCurr} className="bg-black dark:bg-white text-white dark:text-black px-4 rounded-xl text-xs font-bold">添加</button>
            </div>
        )}
        <SettingItem label="默认法币" value="CNY" icon={<DollarSign size={18} />} />
        <SettingItem label="汇率源" value={settings.rateSource} icon={<ArrowRightLeft size={18} />} isLast onClick={() => {
            const RATE_SOURCES = ['ExchangeAPI + Binance', 'CoinGecko', 'Manual'];
            const nextIndex = (RATE_SOURCES.indexOf(settings.rateSource) + 1) % RATE_SOURCES.length;
            setSettings({ ...settings, rateSource: RATE_SOURCES[nextIndex] });
        }} />
        <div onClick={onReset} className="flex items-center justify-between p-5 border-t border-gray-50 dark:border-gray-800 active:bg-red-50 dark:active:bg-red-900/20 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4"><div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-2 rounded-lg"><Trash2 size={18} /></div><span className="text-sm font-bold text-red-600 dark:text-red-400">重置所有数据</span></div>
            <ChevronRight size={16} className="text-red-300" />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. Main App Component (Must be last)
// ==========================================

export default function App() {
  const [transactions, setTransactions] = usePersistedState('data_transactions', []);
  const [accounts, setAccounts] = usePersistedState('data_accounts', INITIAL_ACCOUNTS_DATA);
  const [currencies, setCurrencies] = usePersistedState('data_currencies', DEFAULT_CURRENCIES);
  const [userAvatar, setUserAvatar] = usePersistedState('user_avatar', DEFAULT_BTC_AVATAR);
  const [userNickname, setUserNickname] = usePersistedState('user_nickname', getRandomTycoonName());
  const [settings, setSettings] = usePersistedState('app_settings', { defaultAccountId: 'acc_alipay', rateSource: 'ExchangeAPI + Binance' });
  
  const [activeTab, setActiveTab] = useState('home'); 
  const [showAddModal, setShowAddModal] = useState(false);
  const [rates, setRates] = usePersistedState('cache_rates', {});
  const [ratesLastUpdated, setRatesLastUpdated] = usePersistedState('cache_rates_ts', null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [theme, setTheme] = useTheme();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
      if (!accounts || !Array.isArray(accounts) || accounts.length === 0) setAccounts(INITIAL_ACCOUNTS_DATA);
      if (!currencies || !Array.isArray(currencies) || currencies.length === 0) setCurrencies(DEFAULT_CURRENCIES);
  }, []);

  useEffect(() => {
    const checkAndUpdateRates = async () => {
        const now = Date.now();
        const tenMinutes = 10 * 60 * 1000;
        const lastUpdate = ratesLastUpdated ? new Date(ratesLastUpdated).getTime() : 0;

        if (now - lastUpdate < tenMinutes && Object.keys(rates).length > 0) return;

        setLoadingRates(true);
        const newRates = { ...rates };
        let usdToCny = 7.24; 

        try {
            const res = await fetch('https://api.exchangerate-api.com/v4/latest/CNY');
            const data = await res.json();
            if (data && data.rates) {
                currencies.filter(c => c.type === 'fiat').forEach(curr => {
                    const rateInCny = data.rates[curr.code];
                    newRates[curr.code] = rateInCny ? (1 / rateInCny) : curr.fallbackRate;
                });
                newRates['CNY'] = 1; 
                if(data.rates['USD']) usdToCny = 1 / data.rates['USD'];
            }
        } catch (e) { console.error("Fiat API Failed", e); }

        try {
            const cryptoCurrencies = currencies.filter(c => c.type === 'crypto');
            await Promise.all(cryptoCurrencies.map(async (curr) => {
                if (curr.code === 'USDT' || curr.code === 'USDC') {
                    newRates[curr.code] = usdToCny;
                    return;
                }
                if (curr.binanceSymbol) {
                    try {
                        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${curr.binanceSymbol}`);
                        const data = await res.json();
                        if (data.price) {
                            newRates[curr.code] = parseFloat(data.price) * usdToCny;
                        }
                    } catch(e) { }
                }
            }));
        } catch (e) { console.error("Crypto API Failed", e); }

        currencies.forEach(c => {
            if (!newRates[c.code] && !rates[c.code]) newRates[c.code] = c.fallbackRate;
        });

        setRates(newRates);
        setRatesLastUpdated(now);
        setLoadingRates(false);
    };
    checkAndUpdateRates();
  }, [currencies]);

  const currentRates = useMemo(() => {
      if (Object.keys(rates).length > 0) return rates;
      const fallback = {};
      currencies.forEach(c => fallback[c.code] = c.fallbackRate);
      return fallback;
  }, [rates, currencies]);

  const totalExpenseCNY = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.cnyAmount, 0);
  }, [transactions]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
    setAccounts(prevAccounts => prevAccounts.map(acc => {
      if (newTransaction.type === 'expense' && acc.id === newTransaction.accountId) {
        return { ...acc, balance: acc.balance - newTransaction.amount };
      }
      if (newTransaction.type === 'income' && acc.id === newTransaction.accountId) {
        return { ...acc, balance: acc.balance + newTransaction.amount };
      }
      if (newTransaction.type === 'transfer') {
        if (acc.id === newTransaction.fromAccountId) {
           return { ...acc, balance: acc.balance - newTransaction.amount };
        }
        if (acc.id === newTransaction.toAccountId) {
           return { ...acc, balance: acc.balance + newTransaction.amount };
        }
      }
      return acc;
    }));
    setShowAddModal(false);
    const randomQuote = FEEDBACK_QUOTES[Math.floor(Math.random() * FEEDBACK_QUOTES.length)];
    setFeedbackText(randomQuote);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 4000);
  };

  const handleAddAccount = (newAccount) => setAccounts([...accounts, newAccount]);
  const handleDeleteAccount = (accountId) => setAccounts(accounts.filter(a => a.id !== accountId));
  const handleAddCurrency = (newCurrency) => setCurrencies([...currencies, newCurrency]);
  
  const handleReorderAccounts = (sourceIndex, direction) => {
      const newAccounts = [...accounts];
      const targetIndex = direction === 'up' ? sourceIndex - 1 : sourceIndex + 1;
      if (targetIndex >= 0 && targetIndex < newAccounts.length) {
          [newAccounts[sourceIndex], newAccounts[targetIndex]] = [newAccounts[targetIndex], newAccounts[sourceIndex]];
          setAccounts(newAccounts);
      }
  };

  const resetAllData = () => {
      if(confirm("确定要重置所有数据吗？这将清除所有账单并恢复默认设置。")) {
          setTransactions([]);
          setAccounts(INITIAL_ACCOUNTS_DATA);
          setCurrencies(DEFAULT_CURRENCIES);
          setRates({});
          setRatesLastUpdated(null);
          window.localStorage.clear();
          window.location.reload();
      }
  };

  return (
    <div className="relative w-full h-screen bg-[#F2F2F7] dark:bg-[#000000] font-sans text-gray-900 dark:text-white overflow-hidden flex flex-col transition-colors duration-500 ease-in-out">
      <div className="w-full h-11 bg-transparent flex items-end justify-between pb-2 px-6 shrink-0 z-20 absolute top-0 left-0 pointer-events-none">
          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1"><Cloud size={10} /> iCloud Synced</span>
          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">{loadingRates ? 'Updating Rates...' : '5G'}</span>
      </div>

      {showFeedback && (
          <div className="absolute top-14 left-4 right-4 z-[60] animate-in slide-in-from-top-4 fade-in duration-500 pointer-events-none">
              <div className="bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl p-4 flex items-center gap-3 border border-white/20 dark:border-gray-700/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30 shrink-0"><Sparkles size={20} /></div>
                  <div><h4 className="text-sm font-bold mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">记账成功</h4><p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">{feedbackText}</p></div>
              </div>
          </div>
      )}

      <div className="flex-1 overflow-y-auto pb-28 pt-12 no-scrollbar scroll-smooth">
        {activeTab === 'home' && <HomeView transactions={transactions} totalExpense={totalExpenseCNY} userAvatar={userAvatar} userNickname={userNickname} />}
        {activeTab === 'assets' && <AssetsView accounts={accounts} onAddAccount={handleAddAccount} onDeleteAccount={handleDeleteAccount} rates={currentRates} currencies={currencies} lastUpdated={ratesLastUpdated} source={settings.rateSource} />}
        {activeTab === 'stats' && <StatsView transactions={transactions} accounts={accounts} rates={currentRates} />}
        {activeTab === 'settings' && <SettingsView userAvatar={userAvatar} setUserAvatar={setUserAvatar} userNickname={userNickname} setUserNickname={setUserNickname} theme={theme} setTheme={setTheme} currencies={currencies} onAddCurrency={handleAddCurrency} settings={settings} setSettings={setSettings} accounts={accounts} onReorderAccounts={handleReorderAccounts} onReset={resetAllData} />}
      </div>

      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} onAdd={() => setShowAddModal(true)} />
      {showAddModal && <AddTransactionModal accounts={accounts} rates={currentRates} currencies={currencies} defaultAccountId={settings.defaultAccountId} onClose={() => setShowAddModal(false)} onSave={handleAddTransaction} onReset={resetAllData} />}
    </div>
  );
}