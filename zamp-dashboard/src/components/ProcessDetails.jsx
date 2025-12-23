import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Video, Database, ChevronUp, ChevronDown, Check, Maximize2, Loader2, Star, MonitorPlay, X, Mail } from 'lucide-react';

const ProcessDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeArtifact, setActiveArtifact] = useState(null);
    const [allProcessIds, setAllProcessIds] = useState([]);
    const [expandedReasoning, setExpandedReasoning] = useState([]);

    const toggleReasoning = (logId) => {
        setExpandedReasoning(prev =>
            prev.includes(logId)
                ? prev.filter(id => id !== logId)
                : [...prev, logId]
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/data/process_${id}.json`);
                if (!response.ok) {
                    throw new Error('Process data not found');
                }
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching process data:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();

        // Poll for updates every 2 seconds - THIS WAS MISSING
        const interval = setInterval(() => {
            fetchData();
        }, 2000);

        return () => clearInterval(interval);
    }, [id]);

    // Fetch all available process IDs
    useEffect(() => {
        const fetchAllProcesses = async () => {
            try {
                const response = await fetch('/data/processes.json');
                if (response.ok) {
                    const processes = await response.json();
                    const ids = processes.map(p => p.id).sort((a, b) => a - b);
                    setAllProcessIds(ids);
                }
            } catch (err) {
                console.error("Error fetching process list:", err);
            }
        };

        fetchAllProcesses();

        // Also poll the process list every 2 seconds for new processes
        const processListInterval = setInterval(() => {
            fetchAllProcesses();
        }, 2000);

        return () => clearInterval(processListInterval);
    }, []);

    const currentIndex = allProcessIds.indexOf(parseInt(id));
    const canGoUp = currentIndex > 0;
    const canGoDown = currentIndex < allProcessIds.length - 1;

    const handleNavigateUp = () => {
        if (canGoUp) {
            navigate(`/done/process/${allProcessIds[currentIndex - 1]}`);
        }
    };

    const handleNavigateDown = () => {
        if (canGoDown) {
            navigate(`/done/process/${allProcessIds[currentIndex + 1]}`);
        }
    };

    const getIconComponent = (iconType) => {
        switch (iconType) {
            case 'file': return FileText;
            case 'video': return Video;
            case 'dashboard': return Database;
            default: return FileText;
        }
    };

    const handleArtifactClick = (artifact) => {
        setActiveArtifact(artifact);
    };

    if (loading && !data) return <div className="flex justify-center items-center h-screen"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    if (!data) return null;

    const { logs, keyDetails, sidebarArtifacts } = data;

    return (
        <div className="flex h-screen bg-white">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Process ID Header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Claim ID</span>
                            <span className="font-semibold text-xs">#{id}</span>
                        </div>
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs border ${(keyDetails.status === 'Complete' || keyDetails.Status === 'Complete') ? 'text-gray-700 border-gray-200' : 'text-blue-700 border-blue-200 bg-blue-50'}`}>
                            {(keyDetails.status === 'Complete' || keyDetails.Status === 'Complete') ? (
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2 w-2">
                                    <rect x="0.75" y="0.75" width="6.5" height="6.5" rx="2"
                                        className="fill-green-100 stroke-green-700"
                                        strokeWidth="1.5" />
                                </svg>
                            ) : <Loader2 className="h-3 w-3 text-blue-600 animate-spin" />}
                            <span>{(keyDetails.status === 'Complete' || keyDetails.Status === 'Complete') ? 'Done' : keyDetails.status === 'processing' ? 'In Progress' : (keyDetails.status || keyDetails.Status || 'In Progress')}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{currentIndex + 1} / {allProcessIds.length}</span>
                        <button
                            onClick={handleNavigateUp}
                            disabled={!canGoUp}
                            className={`p-1 h-7 w-7 rounded hover:bg-gray-100 ${!canGoUp ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ChevronUp className="h-3.5 w-3.5 text-gray-600" />
                        </button>
                        <button
                            onClick={handleNavigateDown}
                            disabled={!canGoDown}
                            className={`p-1 h-7 w-7 rounded hover:bg-gray-100 ${!canGoDown ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ChevronDown className="h-3.5 w-3.5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Activity Timeline */}
                <div className="flex-1 overflow-y-auto">
                    {/* Today Divider */}
                    <div className="flex items-center py-6 px-8">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="flex-shrink mx-4 text-xs text-gray-500 font-medium">Today</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="max-w-3xl">
                            {logs.map((log, index) => {
                                const isLastItem = index === logs.length - 1;
                                const isComplete = log.status !== 'processing';

                                return (
                                    <div key={log.id} className="relative pb-12">
                                        <div className="relative flex gap-4">
                                            {/* Time */}
                                            <div className="w-20 flex-shrink-0 text-right">
                                                <span className="text-xs text-gray-500">{log.time}</span>
                                            </div>

                                            {/* Timeline Icon */}
                                            <div className="relative flex flex-col items-center">
                                                <div className="relative z-10 bg-white">
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 mt-1">
                                                        <rect x="0.75" y="0.75" width="6.5" height="6.5" rx="2"
                                                            className={
                                                                log.status === 'warning' ? "fill-yellow-100 stroke-yellow-700" :
                                                                    log.status === 'error' ? "fill-red-100 stroke-red-700" :
                                                                        log.status === 'success' ? "fill-green-100 stroke-green-700" :
                                                                            "fill-blue-100 stroke-blue-700"
                                                            }
                                                            strokeWidth="1.5" />
                                                    </svg>
                                                </div>
                                                {!isLastItem && (
                                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px bg-gray-200" style={{ height: 'calc(100% + 5rem)' }}></div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 -mt-0.5">
                                                <h3 className="text-xs font-normal text-gray-900 mb-2">{log.title}</h3>

                                                {/* Reasoning Block */}
                                                {log.reasoning && (
                                                    <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white max-w-md">
                                                        <button
                                                            onClick={() => toggleReasoning(log.id)}
                                                            className="w-full flex items-center justify-between gap-1 text-[11px] font-medium text-gray-900 hover:bg-gray-50 transition-colors px-3 py-2 border-b border-transparent data-[expanded=true]:border-gray-200"
                                                            data-expanded={expandedReasoning.includes(log.id)}
                                                        >
                                                            <span>See reasoning</span>
                                                            <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${expandedReasoning.includes(log.id) ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        {expandedReasoning.includes(log.id) && (
                                                            <div className="p-1 px-3 pb-3 space-y-2 mt-1 max-height-container overflow-y-auto" style={{ maxHeight: '140px' }}>
                                                                {(Array.isArray(log.reasoning) ? log.reasoning : [log.reasoning]).map((step, i) => (
                                                                    <div key={i} className="flex gap-2 text-[11px] text-gray-600 leading-relaxed group">
                                                                        <span className="text-gray-300 select-none mt-0.5 font-light">└</span>
                                                                        <span>{step}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
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
                                                                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs text-gray-600 bg-gray-100 hover:bg-gray-100 border border-gray-200"
                                                                >
                                                                    <IconComponent className="h-3 w-3 text-gray-500" />
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

                                                {log.status === 'error' && (
                                                    <div className="mt-4">
                                                        <button
                                                            onClick={() => setActiveArtifact({
                                                                type: 'email',
                                                                label: 'Patient Notification',
                                                                id: 'email-notification-101'
                                                            })}
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                                                        >
                                                            <div className="w-5 h-5 flex items-center justify-center">
                                                                <img src="/gmail-icon.png" alt="Gmail" className="w-4 h-4 object-contain" />
                                                            </div>
                                                            Notify Patient via Mail
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar - Key Details OR Artifact Preview */}
            <aside className={`${activeArtifact ? 'w-[500px]' : 'w-80'} border-l border-gray-200 bg-white overflow-hidden flex flex-col transition-all duration-300 ease-in-out`}>
                {activeArtifact ? (
                    <div className="flex flex-col h-full bg-white">
                        {/* Preview Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
                            <h3 className="text-sm font-semibold text-gray-900">
                                {activeArtifact.type === 'file' ? 'Document' : activeArtifact.type === 'video' ? 'Video' : 'Email'}
                            </h3>
                            <button
                                onClick={() => setActiveArtifact(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        {/* Preview Content */}
                        <div className="flex-1 overflow-hidden bg-gray-50">
                            {activeArtifact.type === 'file' ? (
                                <div className="p-4 h-full">
                                    <iframe
                                        src={activeArtifact.pdfPath}
                                        className="w-full h-full border border-gray-200 rounded-xl shadow-sm bg-white"
                                        title={activeArtifact.label}
                                    />
                                </div>
                            ) : activeArtifact.type === 'video' ? (
                                <div className="p-4 h-full">
                                    <div className="h-full flex items-center justify-center bg-black rounded-xl overflow-hidden shadow-sm">
                                        <video controls autoPlay className="max-w-full max-h-full" src={activeArtifact.videoPath}>
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                            ) : (
                                /* Email Preview UI */
                                <div className="flex flex-col h-full bg-white font-sans">
                                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                                        {/* Email Headers */}
                                        <div className="space-y-5">
                                            <div className="grid grid-cols-[60px_1fr] items-center gap-4">
                                                <label className="text-sm font-medium text-gray-500 text-right">To</label>
                                                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                                                    <span className="text-sm text-gray-900 font-medium">Robert.J.Anderson@example.com</span>
                                                    <button className="text-gray-400 hover:text-gray-600 ml-auto p-0.5 rounded-full hover:bg-gray-200 transition-colors">
                                                        <X className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-[60px_1fr] items-center gap-4">
                                                <label className="text-sm font-medium text-gray-500 text-right">Subject</label>
                                                <input
                                                    type="text"
                                                    value="Action Required: Claim Determination - Secondary Payer Notification"
                                                    readOnly
                                                    className="w-full text-sm text-gray-900 font-medium px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
                                                />
                                            </div>
                                        </div>

                                        <div className="h-px bg-gray-100 w-full" />

                                        {/* Email Body */}
                                        <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed text-sm">
                                            <p className="mb-4">Dear Mr. Anderson,</p>
                                            <p className="mb-4">We have processed your recent claim (ID: CLM-2024-1202-792468) for services rendered on December 2, 2024.</p>

                                            <div className="my-6 p-4 bg-[#FFF9EA] border border-[#F5E6C8] rounded-xl text-[#7A5400] text-sm shadow-sm">
                                                <strong className="block mb-1 font-semibold">Notice:</strong>
                                                Our records indicate that UHC is the secondary payer for this claim. Medicare appears to be the primary payer.
                                            </div>

                                            <p className="mb-4">Please submit this claim to Medicare first. Once Medicare has processed the claim, you may resubmit the Explanation of Benefits (EOB) to us for secondary consideration.</p>
                                            <p className="mb-6">If you have any questions, please contact our Member Services team.</p>

                                            <div className="mt-8 text-gray-500">
                                                <p className="mb-1">Regards,</p>
                                                <p className="font-semibold text-gray-700">UHC Claims Team</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Footer / Actions */}
                                    <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-3 sticky bottom-0 z-10">
                                        <button
                                            onClick={() => setActiveArtifact(null)}
                                            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                /* Mock Send Action */
                                                setActiveArtifact(null);
                                            }}
                                            className="px-5 py-2.5 bg-[#1F2937] text-white text-sm font-semibold rounded-lg hover:bg-black transition-all shadow-md hover:shadow-lg transform active:scale-95 duration-200"
                                        >
                                            Approve & Send
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-5 overflow-y-auto h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                <Star className="h-4 w-4 text-gray-400" />
                                Key Details
                            </h2>
                            <button className="p-1 hover:bg-gray-100 rounded">
                                <Maximize2 className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>

                        {/* Case Details Section */}
                        <div className="mb-5">
                            <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">Claim Details</h3>
                            <div className="space-y-2.5 text-xs">
                                {Object.entries(keyDetails).map(([key, value]) => (
                                    <div key={key} className="flex justify-between gap-4">
                                        <span className="text-gray-500 whitespace-nowrap">{key}</span>
                                        <span className="text-gray-900 font-medium text-right">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-200 my-5"></div>

                        {/* Artifacts Section */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <MonitorPlay className="h-4 w-4 text-gray-700" />
                                Artifacts
                            </h3>
                            <div className="flex flex-col gap-2 items-start">
                                {sidebarArtifacts.map((artifact) => {
                                    const IconComponent = getIconComponent(artifact.icon);
                                    return (
                                        <button
                                            key={artifact.id}
                                            onClick={() => handleArtifactClick(artifact)}
                                            className="inline-flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 text-left border border-gray-200 bg-gray-100 w-full"
                                        >
                                            <IconComponent className="h-3.5 w-3.5 text-gray-500 flex-shrink-0" />
                                            <span className="text-xs text-gray-700 truncate">{artifact.label}</span>
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
                )}
            </aside>
        </div>
    );
};

export default ProcessDetails;