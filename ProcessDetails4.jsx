import React from 'react';
import { FileText, Video, Database, ChevronLeft, ChevronRight, Check, Maximize2, Mail } from 'lucide-react';

const ProcessDetails4 = () => {
    const [currentId] = React.useState('4');
    const [videoModal, setVideoModal] = React.useState({ isOpen: false, videoPath: '', title: '' });
    const [emailModal, setEmailModal] = React.useState({ isOpen: false, title: '' });
    const [csvModal, setCsvModal] = React.useState({ isOpen: false, title: '' });

    const logs = [
        {
            id: 'act1',
            time: '06:07 PM',
            title: 'Received Email from Airbnb Tax team',
            type: 'success',
            artifacts: [
                { type: 'email', label: 'Email', id: 'art-tax-email', icon: 'email' },
                { type: 'csv', label: 'Updated Tax Values CSV', id: 'art-csv', icon: 'file' }
            ]
        },
        {
            id: 'act2',
            time: '06:08 PM',
            title: 'Extracted Information from Email',
            type: 'success',
            description: [
                'Change in Tax and VAT values due to new Tax regulations detected. Pending update in Kyriba'
            ]
        },
        {
            id: 'act3',
            time: '06:08 PM',
            title: 'Logged into Kyriba Portal with OTP Authentication',
            type: 'success',
            artifacts: [
                { type: 'video', label: 'Login Video', id: 'art-login-video', icon: 'video', videoPath: '/videos/process 4 login.webm' }
            ]
        },
        {
            id: 'act4',
            time: '06:09 PM',
            title: 'Made necessary changes to VAT Collected and Tax rows for the year 2024 in Kyriba Liquidity Plan sheet',
            type: 'success',
            artifacts: [
                { type: 'video', label: 'Updation Video', id: 'art-update-video', icon: 'video', videoPath: '/videos/process 4 field change.webm' }
            ]
        },
    ];

    const csvData = [
        { month: 'Dec-23', vat: '133539', tax: '-708511' },
        { month: 'Jan-24', vat: '181559', tax: '-686209' },
        { month: 'Feb-24', vat: '154037', tax: '-229196' },
        { month: 'Mar-24', vat: '18592', tax: '-171618' },
        { month: 'Apr-24', vat: '77800', tax: '-928099' },
        { month: 'May-24', vat: '248214', tax: '-946970' },
        { month: 'Jun-24', vat: '169246', tax: '-594458' },
        { month: 'Jul-24', vat: '45233', tax: '-688397' },
        { month: 'Aug-24', vat: '187976', tax: '-598091' },
        { month: 'Sep-24', vat: '110000', tax: '-440000' },
        { month: 'Oct-24', vat: '55000', tax: '-440000' },
        { month: 'Nov-24', vat: '0', tax: '-440000' },
        { month: 'Dec-24', vat: '-110000', tax: '-440000' }
    ];

    const keyDetails = {
        processName: 'Tax & VAT Update',
        team: 'Tax Revenue',
        processingDate: '2025-12-02',
        status: 'Complete'
    };

    const sidebarArtifacts = [
        { type: 'email', label: 'Email', id: 'art-tax-email', icon: 'email' },
        { type: 'csv', label: 'Updated Tax Values CSV', id: 'art-csv', icon: 'file' },
        { type: 'video', label: 'Login Video', id: 'art-login-video', icon: 'video', videoPath: '/videos/process 4 login.webm' },
        { type: 'video', label: 'Updation Video', id: 'art-update-video', icon: 'video', videoPath: '/videos/process 4 field change.webm' },
    ];

    const getIconComponent = (iconType) => {
        switch (iconType) {
            case 'file': return FileText;
            case 'video': return Video;
            case 'dashboard': return Database;
            case 'email': return Mail;
            default: return FileText;
        }
    };

    const handleArtifactClick = (artifact) => {
        if (artifact.type === 'video' && artifact.videoPath) {
            setVideoModal({
                isOpen: true,
                videoPath: artifact.videoPath,
                title: artifact.label
            });
        } else if (artifact.type === 'email') {
            setEmailModal({
                isOpen: true,
                title: artifact.label
            });
        } else if (artifact.type === 'csv') {
            setCsvModal({
                isOpen: true,
                title: artifact.label
            });
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Process ID Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Process ID</span>
                        <span className="font-semibold text-xs">{currentId}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-700 border border-gray-200">
                        <Check className="h-3 w-3 text-green-600" />
                        <span>Done</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">4 / 4</span>
                    <button className="p-1 h-7 w-7 rounded hover:bg-gray-100">
                        <ChevronLeft className="h-3.5 w-3.5 text-gray-600" />
                    </button>
                    <button className="p-1 h-7 w-7 rounded hover:bg-gray-100">
                        <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Today Divider */}
                    <div className="flex items-center py-6 px-8">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-xs text-gray-500 font-medium">Today</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Activity Timeline */}
                    <div className="px-8 pb-8">
                        <div className="max-w-3xl">
                            {logs.map((log, index) => (
                                <div key={log.id} className="relative pb-12">
                                    <div className="relative flex gap-4">
                                        {/* Time */}
                                        <div className="w-20 flex-shrink-0 text-right">
                                            <span className="text-xs text-gray-500">{log.time}</span>
                                        </div>

                                        {/* Green Square Icon with Timeline */}
                                        <div className="relative flex flex-col items-center">
                                            <div className="relative z-10 bg-white">
                                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 mt-1">
                                                    <rect x="0.75" y="0.75" width="6.5" height="6.5" rx="2" className="fill-green-100 stroke-green-700" strokeWidth="1.5" />
                                                </svg>
                                            </div>
                                            {index !== logs.length - 1 && (
                                                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px bg-gray-200" style={{ height: 'calc(100% + 5rem)' }}></div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 -mt-0.5">
                                            <h3 className="text-xs font-normal text-gray-900 mb-2">{log.title}</h3>

                                            {/* Description Box for Extracted Information */}
                                            {log.description && (
                                                <div className="bg-gray-100 border border-gray-200 rounded p-3 mb-2">
                                                    <ul className="space-y-1.5">
                                                        {log.description.map((item, idx) => (
                                                            <li key={idx} className="text-xs text-gray-900 flex items-start">
                                                                <span className="mr-2">•</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Artifacts */}
                                            {log.artifacts && log.artifacts.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {log.artifacts.map((artifact) => {
                                                        const IconComponent = getIconComponent(artifact.icon);
                                                        return (
                                                            <button
                                                                key={artifact.id}
                                                                onClick={() => handleArtifactClick(artifact)}
                                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200"
                                                            >
                                                                <IconComponent className="h-3 w-3 text-gray-600" />
                                                                <span className="text-xs">{artifact.label}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
                    <div className="p-4">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                                Key Details
                                <ChevronLeft className="h-3 w-3 -rotate-90" />
                            </h2>
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <Maximize2 className="h-3.5 w-3.5 text-gray-500" />
                            </button>
                        </div>

                        {/* Summary Section */}
                        <div className="mb-6">
                            <h3 className="text-xs font-medium text-gray-500 mb-3">Summary</h3>
                            <div className="space-y-2.5 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Process Name</span>
                                    <span className="text-gray-900 font-medium">{keyDetails.processName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Team</span>
                                    <span className="text-gray-900 font-medium">{keyDetails.team}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Processing Date</span>
                                    <span className="text-gray-900 font-medium">{keyDetails.processingDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Status</span>
                                    <span className="text-gray-900 font-medium">{keyDetails.status}</span>
                                </div>
                            </div>
                        </div>

                        {/* Artifacts Section */}
                        <div>
                            <h3 className="text-xs font-medium text-gray-500 mb-3">Artifacts</h3>
                            <div className="flex flex-col gap-1.5">
                                {sidebarArtifacts.map((artifact) => {
                                    const IconComponent = getIconComponent(artifact.icon);
                                    return (
                                        <button
                                            key={artifact.id}
                                            onClick={() => handleArtifactClick(artifact)}
                                            className="inline-flex items-center gap-2.5 px-2.5 py-2 rounded hover:bg-gray-100 text-left border border-gray-200 bg-gray-50 self-start"
                                        >
                                            <IconComponent className="h-3.5 w-3.5 text-gray-600 flex-shrink-0" />
                                            <span className="text-xs text-gray-900">{artifact.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Video Modal */}
            {videoModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setVideoModal({ isOpen: false, videoPath: '', title: '' })}>
                    <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900">{videoModal.title}</h3>
                            <button
                                onClick={() => setVideoModal({ isOpen: false, videoPath: '', title: '' })}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <video
                                controls
                                autoPlay
                                className="w-full rounded"
                                src={videoModal.videoPath}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}

            {/* Email Modal */}
            {emailModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setEmailModal({ isOpen: false, title: '' })}>
                    <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
                            <h3 className="text-sm font-semibold text-gray-900">{emailModal.title}</h3>
                            <button
                                onClick={() => setEmailModal({ isOpen: false, title: '' })}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 mb-1">Subject:</p>
                                    <p className="text-sm font-semibold text-gray-900">Updated VAT and Tax Values Following New Tax Law Implementation</p>
                                </div>
                                <div className="mb-6">
                                    <p className="text-sm text-gray-900 mb-4">Hi Team,</p>
                                    <p className="text-sm text-gray-900 mb-4">
                                        As part of the compliance requirements aligned with the recently enacted government tax policy changes, our VAT collections and Tax deductions have been recalculated for the period of December 2023 through December 2024.
                                    </p>
                                    <p className="text-sm text-gray-900 mb-2">The new regulations mandate:</p>
                                    <ul className="list-disc list-inside text-sm text-gray-900 mb-4 space-y-1 ml-4">
                                        <li>Higher VAT collection percentages applied on marketplace service revenue</li>
                                        <li>Revised tax deduction rules for digital service marketplaces</li>
                                        <li>Retroactive application beginning Dec 2023</li>
                                    </ul>
                                    <p className="text-sm text-gray-900 mb-4">
                                        Attached below is the updated dataset reflecting these statutory adjustments.
                                    </p>
                                    <p className="text-sm text-gray-900 mb-4">
                                        Please ensure that forthcoming financial reports, reconciliations, and statutory filings use the updated figures for VAT and Tax impacts.
                                    </p>
                                    <p className="text-sm text-gray-900 mb-4">
                                        Let me know if you need this incorporated into our monthly accounting packages or Power BI dashboards.
                                    </p>
                                    <p className="text-sm text-gray-900">Regards,<br />Tax Team – Airbnb</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CSV Modal */}
            {csvModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setCsvModal({ isOpen: false, title: '' })}>
                    <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
                            <h3 className="text-sm font-semibold text-gray-900">{csvModal.title}</h3>
                            <button
                                onClick={() => setCsvModal({ isOpen: false, title: '' })}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full border border-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-300 text-left text-xs font-semibold text-gray-900">Month</th>
                                            <th className="px-4 py-2 border border-gray-300 text-left text-xs font-semibold text-gray-900">VAT Collected — New</th>
                                            <th className="px-4 py-2 border border-gray-300 text-left text-xs font-semibold text-gray-900">Taxes — New</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {csvData.map((row, idx) => (
                                            <tr key={idx}>
                                                <td className="px-4 py-2 border border-gray-300 text-xs text-gray-900">{row.month}</td>
                                                <td className="px-4 py-2 border border-gray-300 text-xs text-gray-900">{row.vat}</td>
                                                <td className="px-4 py-2 border border-gray-300 text-xs text-gray-900">{row.tax}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProcessDetails4;