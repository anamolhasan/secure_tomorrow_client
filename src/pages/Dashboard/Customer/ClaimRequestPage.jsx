// ClaimRequestPage.jsx
import { useEffect, useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const ClaimRequestPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [approvedPolicies, setApprovedPolicies] = useState([]);
  const [existingClaims, setExistingClaims] = useState({});
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    const fetchApprovedPolicies = async () => {
      const res = await axiosSecure.get('/approved-policies');
      setApprovedPolicies(res.data || []);
    };

    const fetchClaims = async () => {
      const res = await axiosSecure.get(`/claims/${user.email}`);
      const claimsMap = {};
      res.data.forEach(claim => {
        claimsMap[claim.policyId] = claim.status;
      });
      setExistingClaims(claimsMap);
    };

    if (user?.email) {
      fetchApprovedPolicies();
      fetchClaims();
    }
  }, [user, axiosSecure]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedPolicy || !reason || !file) return;

    const formData = new FormData();
    formData.append('policyId', selectedPolicy._id);
    formData.append('policyName', selectedPolicy.title);
    formData.append('email', user.email);
    formData.append('reason', reason);
    formData.append('document', file);
    formData.append('status', 'Pending');

    try {
      await axiosSecure.post('/submit-claim', formData);
      Swal.fire('Submitted!', 'Your claim has been submitted.', 'success');
      setExistingClaims(prev => ({ ...prev, [selectedPolicy._id]: 'Pending' }));
    } catch (error) {
      Swal.fire('Error', 'Failed to submit claim.', 'error');
    }
  };

  const handleApprovedClick = id => {
    Swal.fire('Claim Approved!', `Policy ID: ${id}`, 'info');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Claim Request Page</h2>

      <ul className="mb-6">
        {Array.isArray(approvedPolicies) &&
          approvedPolicies.map(policy => (
            <li key={policy._id} className="mb-2">
              <b>{policy.title}</b>{' '}
              {existingClaims[policy._id] === 'Pending' && (
                <span className="text-orange-500">Claim Pending</span>
              )}
              {existingClaims[policy._id] === 'approved' && (
                <button
                  onClick={() => handleApprovedClick(policy._id)}
                  className="text-green-600 underline ml-2"
                >
                  Approved
                </button>
              )}
              {!existingClaims[policy._id] && (
                <button
                  onClick={() => setSelectedPolicy(policy)}
                  className="text-blue-600 underline ml-2"
                >
                  Claim Now
                </button>
              )}
            </li>
          ))}
      </ul>

      {selectedPolicy && (
        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
          <div>
            <label className="block font-medium">Policy Name:</label>
            <input
              type="text"
              value={selectedPolicy.title}
              readOnly
              className="border px-3 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Reason:</label>
            <textarea
              className="border px-3 py-1 rounded w-full"
              value={reason}
              onChange={e => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-medium">Upload Document:</label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={e => setFile(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Claim
          </button>
        </form>
      )}
    </div>
  );
};

export default ClaimRequestPage;