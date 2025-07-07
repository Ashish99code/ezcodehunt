import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentSubmissions = () => {
  const recentSubmissions = [
    {
      id: 1,
      toolName: "CodeMaster AI",
      submitter: "John Developer",
      submittedAt: "2024-01-15T10:30:00Z",
      category: "AI Assistant",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&h=100&fit=crop&crop=center",
      description: "Advanced AI-powered code completion and generation tool with multi-language support."
    },
    {
      id: 2,
      toolName: "DevFlow Pro",
      submitter: "Sarah Wilson",
      submittedAt: "2024-01-14T15:45:00Z",
      category: "Workflow",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=100&fit=crop&crop=center",
      description: "Streamlined development workflow management with integrated CI/CD pipeline."
    },
    {
      id: 3,
      toolName: "BugHunter X",
      submitter: "Mike Chen",
      submittedAt: "2024-01-14T09:20:00Z",
      category: "Debugging",
      status: "reviewing",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center",
      description: "Intelligent bug detection and fixing suggestions powered by machine learning."
    },
    {
      id: 4,
      toolName: "APIGen Studio",
      submitter: "Lisa Rodriguez",
      submittedAt: "2024-01-13T14:10:00Z",
      category: "API Tools",
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=center",
      description: "Automated API documentation and testing suite with real-time monitoring."
    },
    {
      id: 5,
      toolName: "CloudSync Dev",
      submitter: "Alex Thompson",
      submittedAt: "2024-01-13T11:30:00Z",
      category: "DevOps",
      status: "reviewing",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop&crop=center",
      description: "Cloud-native development environment with seamless deployment capabilities."
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning bg-opacity-20 text-warning border-warning';
      case 'reviewing':
        return 'bg-primary bg-opacity-20 text-primary border-primary';
      case 'approved':
        return 'bg-success bg-opacity-20 text-success border-success';
      case 'rejected':
        return 'bg-error bg-opacity-20 text-error border-error';
      default:
        return 'bg-surface-secondary text-text-secondary border-border';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-surface border border-border rounded-lg neumorphic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Recent Submissions</h3>
          <Button variant="ghost" iconName="ArrowRight">
            View All
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {recentSubmissions.map((submission) => (
          <div key={submission.id} className="p-6 hover:bg-surface-secondary transition-fast">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={submission.thumbnail}
                  alt={submission.toolName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-text-primary truncate">
                      {submission.toolName}
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      by {submission.submitter} • {formatDate(submission.submittedAt)}
                    </p>
                    <p className="text-xs text-text-secondary mt-2 line-clamp-2">
                      {submission.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(submission.status)}`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Tag" size={14} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">{submission.category}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" iconName="Eye">
                      Review
                    </Button>
                    <Button variant="primary" size="sm" iconName="Check">
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSubmissions;