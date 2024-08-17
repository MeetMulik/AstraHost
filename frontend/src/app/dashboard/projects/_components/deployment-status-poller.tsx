'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { BASE_URL } from '@/utils/constants';


interface DeploymentStatusPollerProps {
  projectId: string;
  initialStatus: string;
}

const DeploymentStatusPoller: React.FC<DeploymentStatusPollerProps> = ({ projectId, initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  const router = useRouter();

  useEffect(() => {
    if (status === 'READY' || status === 'FAILED') return;

    let pollCount = 0;
    const maxPolls = 18; // 3 minutes with 10-second intervals
    const interval = setInterval(async () => {
      if (pollCount >= maxPolls) {
        clearInterval(interval);
        router.refresh(); // Refresh the page after the polling limit is reached
        return;
      }

      try {
        const { data } = await axios.get(`${BASE_URL}/deploy/${projectId}/latest`);
        const newStatus = data.data?.deploymentStatus;
        setStatus(newStatus);

        if (newStatus === 'READY' || newStatus === 'FAILED') {
          clearInterval(interval); // Stop polling if desired status is reached
          router.refresh(); // Reload the page
        }
      } catch (error) {
        console.error('Error polling deployment status:', error);
      }

      pollCount++;
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [projectId, status, router]);

  return null; // This component doesn't render anything
};

export default DeploymentStatusPoller;
