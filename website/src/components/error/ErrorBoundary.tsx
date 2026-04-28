import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../../utils/logger';
import i18n from '../../i18n';

interface Props {
 children?: ReactNode;
}

interface State {
 hasError: boolean;
 error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
 public state: State = {
 hasError: false,
 error: null
 };

 public static getDerivedStateFromError(error: Error): State {
 return { hasError: true, error };
 }

 public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
 logger.fatal('Unhandled React Exception', { 
 error: error.toString(), 
 componentStack: errorInfo.componentStack 
 }, 'ErrorBoundary');
 }

 public render() {
 if (this.state.hasError) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
 <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
 <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
 </svg>
 </div>
 <h1 className="text-2xl font-bold text-gray-900 mb-4">{i18n.t('errorBoundary.title')}</h1>
 <p className="text-gray-500 mb-8">
 {i18n.t('errorBoundary.description')}
 </p>
 <div className="flex gap-4">
 <button
 onClick={() => window.location.reload()}
 className="flex-1 bg-[#47CCD0] hover:bg-[#3bbabb] text-white px-4 py-3 rounded-xl font-bold transition-all"
 >
 {i18n.t('errorBoundary.reload')}
 </button>
 <button
 onClick={() => window.location.href = '/'}
 className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-bold transition-all"
 >
 {i18n.t('errorBoundary.goHome')}
 </button>
 </div>
 {process.env.NODE_ENV !== 'production' && this.state.error && (
 <div className="mt-8 text-start bg-gray-900 text-red-400 p-4 rounded-xl overflow-auto text-xs font-mono">
 {this.state.error.toString()}
 </div>
 )}
 </div>
 </div>
 );
 }

 return this.props.children;
 }
}