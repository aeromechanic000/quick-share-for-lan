const { useState, useEffect, useRef } = React;

// SVG Icons Component
const Icons = {
    Document: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    Download: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    Upload: () => (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="17,8 12,3 7,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    Files: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    Content: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7.5L14.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    FolderEmpty: () => (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    Vote: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 2.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C2.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    Screen: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    Share: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" strokeWidth="2"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" strokeWidth="2"/>
        </svg>
    ),
    Fullscreen: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="9,21 3,21 3,15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="21" y1="3" x2="14" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="21" x2="10" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    FullscreenExit: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="4,14 10,14 10,20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="20,10 14,10 14,4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="14" y1="10" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="3" y1="21" x2="10" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ),
    Code: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
};

// Screen Viewer Component
const ScreenViewer = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [streamError, setStreamError] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const containerRef = useRef(null);

    const handleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <div className="screen-viewer" ref={containerRef}>
            <div className="screen-toolbar">
                <div className="screen-toolbar-left">
                    <Icons.Screen />
                    <span>Live Screen</span>
                    <span className="screen-live-badge">LIVE</span>
                </div>
                <button className="screen-fullscreen-btn" onClick={handleFullscreen} title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                    {isFullscreen ? <Icons.FullscreenExit /> : <Icons.Fullscreen />}
                </button>
            </div>
            <div className="screen-content">
                {isConnecting && !streamError && (
                    <div className="screen-loading">
                        <div className="loading-spinner"></div>
                        <p>Connecting to screen stream...</p>
                    </div>
                )}
                {streamError && (
                    <div className="screen-error">
                        <Icons.Screen />
                        <h4>Screen stream unavailable</h4>
                        <p>Make sure the server is running with --screen flag</p>
                    </div>
                )}
                <img
                    src="/api/screen-stream"
                    alt="Screen Share"
                    className="screen-image"
                    style={{ display: streamError ? 'none' : 'block' }}
                    onLoad={() => setIsConnecting(false)}
                    onError={() => { setStreamError(true); setIsConnecting(false); }}
                />
            </div>
        </div>
    );
};

// HTML Preview Component
const HtmlPreview = () => {
    const [htmlCode, setHtmlCode] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const textareaRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const value = e.target.value;
            setHtmlCode(value.substring(0, start) + '    ' + value.substring(end));
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0);
        }
    };

    return (
        <div className="html-preview">
            <div className="html-preview-editor">
                <div className="panel-header">
                    <div className="header-content">
                        <Icons.Code />
                        <h2>HTML Code</h2>
                    </div>
                    <div className="html-preview-actions">
                        <button
                            className="html-preview-toggle-btn"
                            onClick={() => setShowPreview(!showPreview)}
                        >
                            {showPreview ? 'Hide Preview' : 'Show Preview'}
                        </button>
                        {htmlCode.trim() && (
                            <button
                                className="html-preview-clear-btn"
                                onClick={() => setHtmlCode('')}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>
                <textarea
                    ref={textareaRef}
                    className="html-code-input"
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={'Paste your HTML code here...\n\nExample:\n<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; }\n  </style>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <script>\n    console.log("It works!");\n  </script>\n</body>\n</html>'}
                    spellCheck="false"
                />
            </div>
            {showPreview && (
                <div className="html-preview-output">
                    <div className="panel-header">
                        <div className="header-content">
                            <Icons.Content />
                            <h2>Preview</h2>
                        </div>
                    </div>
                    <iframe
                        className="html-preview-iframe"
                        srcDoc={htmlCode || '<!DOCTYPE html><html><body style="display:flex;align-items:center;justify-content:center;height:100vh;margin:0;color:#999;font-family:sans-serif;">Paste HTML code and click Preview</body></html>'}
                        sandbox="allow-scripts allow-same-origin"
                        title="HTML Preview"
                    />
                </div>
            )}
        </div>
    );
};

const App = () => {
    const [activeTab, setActiveTab] = useState('share');
    const [markdownContent, setMarkdownContent] = useState('');
    const [downloadFiles, setDownloadFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [nickname, setNickname] = useState(() => localStorage.getItem('nickname') || '');

    // Voting state
    const [voteTopics, setVoteTopics] = useState([]);
    const [userVotes, setUserVotes] = useState({});
    const [selectedVotes, setSelectedVotes] = useState({});

    const showScreenTab = window.SCREEN_ENABLED;

    useEffect(() => {
        fetchMarkdownContent();
        fetchDownloadFiles();
        fetchVoteTopics();
        fetchUserVoteStatus();
    }, []);

    const fetchMarkdownContent = async () => {
        try {
            const response = await fetch('/api/markdown');
            const data = await response.json();
            setMarkdownContent(data.content);
        } catch (error) {
            console.error('Error fetching markdown:', error);
            setMarkdownContent('<p>Error loading content</p>');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDownloadFiles = async () => {
        try {
            const response = await fetch('/api/downloads');
            const data = await response.json();
            setDownloadFiles(data.files);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const fetchVoteTopics = async () => {
        try {
            const response = await fetch('/api/vote/topics');
            const data = await response.json();
            setVoteTopics(data.topics || []);
        } catch (error) {
            console.error('Error fetching vote topics:', error);
        }
    };

    const fetchUserVoteStatus = async () => {
        try {
            const response = await fetch('/api/vote/status');
            const data = await response.json();
            setUserVotes(data.votes || {});
        } catch (error) {
            console.error('Error fetching user vote status:', error);
        }
    };

    // Check if all topics have selections
    const canSubmitAllVotes = () => {
        if (voteTopics.length === 0) return false;

        // Check if all topics that haven't been voted on have selections
        for (const topicData of voteTopics) {
            const hasVoted = userVotes.hasOwnProperty(topicData.topic);
            if (!hasVoted && !selectedVotes[topicData.topic]) {
                return false; // Found a topic without a selection
            }
        }

        // Check if there's at least one selection to submit
        return Object.keys(selectedVotes).length > 0;
    };

    const handleSubmitAllVotes = async () => {
        if (!canSubmitAllVotes()) return;

        try {
            // Submit all selected votes
            const submissions = Object.entries(selectedVotes).map(([topic, option]) => ({
                topic,
                option
            }));

            for (const { topic, option } of submissions) {
                const response = await fetch('/api/vote/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ topic, option })
                });

                const data = await response.json();

                if (response.ok) {
                    setVoteTopics(data.topics);
                    setUserVotes(prev => ({ ...prev, [topic]: option }));
                } else {
                    alert(`Error submitting vote for ${topic}: ${data.error}`);
                    return;
                }
            }

            // Clear all selections after successful submission
            setSelectedVotes({});
        } catch (error) {
            console.error('Error submitting votes:', error);
            alert('Failed to submit votes');
        }
    };

    const handleVoteCancel = async (topic) => {
        try {
            const response = await fetch('/api/vote/cancel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });

            const data = await response.json();

            if (response.ok) {
                setVoteTopics(data.topics);
                setUserVotes(prev => {
                    const newVotes = { ...prev };
                    delete newVotes[topic];
                    return newVotes;
                });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error cancelling vote:', error);
            alert('Failed to cancel vote');
        }
    };

    const calculateVotePercentage = (topicData, option) => {
        if (!topicData.results || !topicData.results.votes) return 0;

        const votes = topicData.results.votes;
        const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

        if (totalVotes === 0) return 0;

        return ((votes[option] || 0) / totalVotes * 100).toFixed(1);
    };

    const getTotalSubmissions = (topicData) => {
        if (!topicData.results) return 0;
        return topicData.results.total_submissions || 0;
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFileExtension = (filename) => {
        return filename.split('.').pop().toLowerCase();
    };

    const handleDownload = (filename) => {
        window.location.href = `/download/${filename}`;
    };

    const handleFileUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const trimmed = nickname.trim();
        if (trimmed) formData.append('nickname', trimmed);

        try {
            setUploadStatus('Uploading...');
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setUploadStatus(`Success: ${result.message}`);
                setTimeout(() => setUploadStatus(''), 4000);
            } else {
                setUploadStatus(`Error: ${result.error}`);
                setTimeout(() => setUploadStatus(''), 4000);
            }
        } catch (error) {
            setUploadStatus('Error: Upload failed');
            setTimeout(() => setUploadStatus(''), 4000);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const tabs = [
        { id: 'share', label: 'Share', icon: <Icons.Share /> },
        { id: 'preview', label: 'Preview', icon: <Icons.Code /> },
        ...(showScreenTab ? [{ id: 'screen', label: 'Screen', icon: <Icons.Screen /> }] : [])
    ];

    return (
        <div className="app-container">
            {/* Tab Bar */}
            <div className="tab-bar">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
                <input
                    type="text"
                    className="nickname-input"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => {
                        setNickname(e.target.value);
                        localStorage.setItem('nickname', e.target.value);
                    }}
                />
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'share' && (
                    <div className="share-tab">
                        {/* Left Half */}
                        <div className="left-panel">
                            {/* Upper Part - Markdown Display */}
                            <div className="panel-header">
                                <div className="header-content">
                                    <Icons.Content />
                                    <h2>Documentation</h2>
                                </div>
                            </div>
                            {isLoading ? (
                                <div className="loading-state" style={{ flex: '0 0 35%' }}>
                                    <div className="loading-spinner"></div>
                                    <p>Loading content...</p>
                                </div>
                            ) : (
                                <div
                                    className="markdown-content"
                                    dangerouslySetInnerHTML={{ __html: markdownContent }}
                                />
                            )}

                            {/* Lower Part - Voting Section */}
                            <div className="voting-section">
                                <div className="panel-header">
                                    <div className="header-content">
                                        <Icons.Vote />
                                        <h2>Voting</h2>
                                    </div>
                                </div>
                                <div className="voting-content">
                                    {voteTopics.length === 0 ? (
                                        <div className="empty-state">
                                            <Icons.Vote />
                                            <h4>No voting topics available</h4>
                                            <p>Voting topics will appear here when added</p>
                                        </div>
                                    ) : (
                                        voteTopics.map((topicData, index) => {
                                            const hasVoted = userVotes.hasOwnProperty(topicData.topic);
                                            const currentVote = userVotes[topicData.topic];
                                            const totalSubmissions = getTotalSubmissions(topicData);

                                            return (
                                                <div key={index} className="vote-topic">
                                                    <div className="vote-topic-header">
                                                        <h3 className="vote-topic-title">{topicData.topic}</h3>
                                                        <span className={`vote-status-badge ${hasVoted ? 'voted' : 'pending'}`}>
                                                            {hasVoted ? 'Voted' : 'Pending'}
                                                        </span>
                                                    </div>

                                                    <div className="vote-options">
                                                        {Object.entries(topicData.options).map(([key, label]) => (
                                                            <div
                                                                key={key}
                                                                className={`vote-option ${selectedVotes[topicData.topic] === key ? 'selected' : ''} ${hasVoted ? 'disabled' : ''}`}
                                                                onClick={() => {
                                                                    if (!hasVoted) {
                                                                        setSelectedVotes(prev => ({
                                                                            ...prev,
                                                                            [topicData.topic]: key
                                                                        }));
                                                                    }
                                                                }}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={`vote-${topicData.topic}`}
                                                                    value={key}
                                                                    checked={hasVoted ? currentVote === key : selectedVotes[topicData.topic] === key}
                                                                    onChange={() => {}}
                                                                    disabled={hasVoted}
                                                                />
                                                                <label>{label}</label>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {hasVoted && (
                                                        <div className="vote-actions">
                                                            <button
                                                                className="vote-btn secondary"
                                                                onClick={() => handleVoteCancel(topicData.topic)}
                                                            >
                                                                Cancel Vote
                                                            </button>
                                                        </div>
                                                    )}

                                                    {totalSubmissions > 0 && (
                                                        <div className="vote-stats">
                                                            <div className="vote-stats-header">
                                                                <div className="vote-stats-title">Results</div>
                                                                <div className="total-submissions">
                                                                    {totalSubmissions} submission{totalSubmissions !== 1 ? 's' : ''}
                                                                </div>
                                                            </div>
                                                            {Object.entries(topicData.options).map(([key, label]) => {
                                                                const votes = topicData.results?.votes?.[key] || 0;
                                                                const percentage = calculateVotePercentage(topicData, key);

                                                                return (
                                                                    <div key={key} className="vote-stat-bar">
                                                                        <div className="vote-stat-header">
                                                                            <span className="vote-stat-label">{label}</span>
                                                                            <span className="vote-stat-value">{votes} ({percentage}%)</span>
                                                                        </div>
                                                                        <div className="vote-stat-progress">
                                                                            <div
                                                                                className="vote-stat-fill"
                                                                                style={{ width: `${percentage}%` }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                {/* Global Submit Button */}
                                {voteTopics.length > 0 && (
                                    <div className="global-vote-submit">
                                        <button
                                            className="global-submit-btn"
                                            onClick={handleSubmitAllVotes}
                                            disabled={!canSubmitAllVotes()}
                                        >
                                            <Icons.Vote />
                                            Submit All Votes
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Half */}
                        <div className="right-panel">
                            {/* Upper Half - Downloads */}
                            <div className="downloads-section">
                                <div className="panel-header">
                                    <div className="header-content">
                                        <Icons.Files />
                                        <h3>Downloads</h3>
                                    </div>
                                    <div className="file-count">{downloadFiles.length}</div>
                                </div>
                                <div className="files-list">
                                    {downloadFiles.length === 0 ? (
                                        <div className="empty-state">
                                            <Icons.FolderEmpty />
                                            <h4>No files available</h4>
                                            <p>Files will appear here when added to the downloads folder</p>
                                        </div>
                                    ) : (
                                        downloadFiles.map((file, index) => (
                                            <div key={index} className="file-item">
                                                <div className="file-info">
                                                    <div className="file-icon">
                                                        <Icons.Document />
                                                    </div>
                                                    <div className="file-details">
                                                        <div className="file-name">{file.name}</div>
                                                        <div className="file-meta">
                                                            <span className="file-size">{formatFileSize(file.size)}</span>
                                                            <span className="file-ext">{getFileExtension(file.name).toUpperCase()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    className="download-btn"
                                                    onClick={() => handleDownload(file.name)}
                                                >
                                                    <Icons.Download />
                                                    Download
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Lower Half - Upload */}
                            <div className="upload-section">
                                <div className="panel-header">
                                    <div className="header-content">
                                        <Icons.Upload />
                                        <h3>Upload Files</h3>
                                    </div>
                                </div>
                                <div
                                    className={`upload-area ${isDragging ? 'dragging' : ''}`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                >
                                    <div className="upload-content">
                                        <div className="upload-icon">
                                            <Icons.Upload />
                                        </div>
                                        <h4>Drop files here</h4>
                                        <p>or click to browse your computer</p>
                                        <input
                                            type="file"
                                            className="file-input"
                                            onChange={(e) => {
                                                if (e.target.files.length > 0) {
                                                    handleFileUpload(e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </div>
                                    {uploadStatus && (
                                        <div className={`upload-status ${uploadStatus.startsWith('Error') ? 'error' : 'success'}`}>
                                            {uploadStatus}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'preview' && <HtmlPreview />}
                {activeTab === 'screen' && <ScreenViewer />}
            </div>
        </div>
    );
};

const { createRoot } = ReactDOM;
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
