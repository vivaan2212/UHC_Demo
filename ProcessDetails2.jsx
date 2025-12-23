import React from 'react';
import { FileText, Video, Database, ChevronLeft, ChevronRight, Check, Maximize2 } from 'lucide-react';

const ProcessDetails2 = () => {
    const [currentId] = React.useState('2');
    const [videoModal, setVideoModal] = React.useState({ isOpen: false, videoPath: '', title: '' });
    const [pdfModal, setPdfModal] = React.useState({ isOpen: false, pdfPath: '', title: '' });

    // Mock data matching the exact structure from the image
    const logs = [
        {
            id: 'act1',
            time: '04:32 PM',
            title: 'Received request for Cash Position Data from 1st to 30th March 2024 with Weekly steps',
            type: 'success',
            artifacts: []
        },
        {
            id: 'act2',
            time: '04:33 PM',
            title: 'Logged into Kyriba Portal with OTP Authentication',
            type: 'success',
            artifacts: [{ type: 'video', label: 'Login Video', id: 'art-login-video', icon: 'video', videoPath: '/videos/process 2.webm' }]
        },
        {
            id: 'act3',
            time: '04:33 PM',
            title: 'Applied Date Filters to extract Cash Position Data: Weekly Steps - 1st to 30 March',
            type: 'success',
            artifacts: [
                { type: 'video', label: 'Extraction Video', id: 'art-extract-video', icon: 'video', videoPath: '/videos/process 2.webm' }
            ]
        },
        {
            id: 'act4',
            time: '04:34 PM',
            title: 'Successfully downloaded filtered PDF',
            type: 'success',
            artifacts: [
                { type: 'file', label: 'Cash Position PDF', id: 'art-cash-pdf', icon: 'file', pdfPath: '/march_1st_31st_weekly_data.pdf' }
            ]
        },
    ];

    const keyDetails = {
        processName: 'Weekly Cash Position Extraction',
        team: 'Payouts',
        processingDate: '2025-12-02',
        status: 'Complete'
    };

    const sidebarArtifacts = [
        { type: 'video', label: 'Login Video', id: 'art-login-video', icon: 'video', videoPath: '/videos/process 2.webm' },
        { type: 'video', label: 'Extraction Video', id: 'art-extract-video', icon: 'video', videoPath: '/videos/process 2.webm' },
        { type: 'file', label: 'Cash Position PDF', id: 'art-cash-pdf', icon: 'file', pdfPath: '/march_1st_31st_weekly_data.pdf' },
    ];

    const getIconComponent = (iconType) => {
        switch (iconType) {
            case 'file': return FileText;
            case 'video': return Video;
            case 'dashboard': return Database;
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
        } else if (artifact.type === 'file' && artifact.pdfPath) {
            setPdfModal({
                isOpen: true,
                pdfPath: artifact.pdfPath,
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
                    <span className="text-xs text-gray-500">2 / 4</span>
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
                                                                {artifact.icon === 'dashboard' && (
                                                                    <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                    </svg>
                                                                )}
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
                                            {artifact.icon === 'dashboard' && (
                                                <svg className="h-3 w-3 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            )}
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
                        {/* Modal Header */}
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

                        {/* Video Player */}
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

            {/* PDF Modal */}
            {pdfModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setPdfModal({ isOpen: false, pdfPath: '', title: '' })}>
                    <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full h-[90vh] mx-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900">{pdfModal.title}</h3>
                            <button
                                onClick={() => setPdfModal({ isOpen: false, pdfPath: '', title: '' })}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 p-6 overflow-hidden">
                            <iframe
                                src={pdfModal.pdfPath}
                                className="w-full h-full rounded border border-gray-200"
                                title={pdfModal.title}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProcessDetails2;