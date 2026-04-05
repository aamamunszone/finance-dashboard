import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import useApp from '../../hooks/useApp';

const categories = [
  'Food',
  'Bills',
  'Transport',
  'Entertainment',
  'Shopping',
  'Education',
  'Health',
  'Other',
];

const inputClass =
  'w-full h-9 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors';

const labelClass =
  'block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5';

const defaultForm = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
};

const AddTransactionModal = ({ onClose }) => {
  const { addTransaction } = useApp();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Date is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    addTransaction({
      ...form,
      amount: Number(form.amount),
      category: form.type === 'income' ? 'Income' : form.category,
    });
    onClose();
  };

  const set = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 transition-colors duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <Plus
                size={14}
                className="text-indigo-600 dark:text-indigo-400"
              />
            </div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Add Transaction
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Type toggle */}
          <div>
            <label className={labelClass}>Type</label>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {['expense', 'income'].map((t) => (
                <button
                  key={t}
                  onClick={() => set('type', t)}
                  className={`flex-1 py-2 text-xs font-semibold capitalize transition-colors ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <input
              type="text"
              placeholder="e.g. Grocery Shopping"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              className={inputClass}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Amount (৳)</label>
              <input
                type="number"
                placeholder="0"
                min="1"
                value={form.amount}
                onChange={(e) => set('amount', e.target.value)}
                className={inputClass}
              />
              {errors.amount && (
                <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
              )}
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                className={inputClass}
              />
              {errors.date && (
                <p className="mt-1 text-xs text-red-500">{errors.date}</p>
              )}
            </div>
          </div>

          {/* Category - only for expense */}
          {form.type === 'expense' && (
            <div>
              <label className={labelClass}>Category</label>
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}
                  className={`${inputClass} pr-8 appearance-none cursor-pointer`}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                  ▾
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold transition-colors shadow-sm shadow-indigo-200 dark:shadow-indigo-900/30"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
