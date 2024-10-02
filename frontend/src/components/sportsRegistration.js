import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const SportsRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const location = useLocation();
  const [googleId, setGoogleId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      googleId: params.get("googleId"),
    };
  };

  useEffect(() => {
    const { googleId } = getQueryParams();
    if (googleId) {
      setGoogleId(googleId);
    }
  }, [location]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('https://spirit24-main.onrender.com/sportsDetail', {
          params: { googleId },
        });
        setRegistrations(response.data.registrations);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [googleId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (registrations.length === 0) {
    return <p>No registrations found.</p>;
  }

  return (
    <div className="p-4 md:p-8">
      {registrations.map((registration, index) => (
        <div key={index} className="border rounded p-4 mb-4 shadow-md">
          <h3 className="font-bold mb-2 text-lg md:text-xl">Selected Sport: {registration.sport}</h3>
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Email</th>
                <th className="text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`${registration.captainFirstName} ${registration.captainLastName} (Captain)`}</td>
                <td>{registration.captainEmail}</td>
                <td>{registration.captainContactNumber}</td>
              </tr>
              <tr>
                <td>
                  {registration.viceCaptainFirstName.length > 0 && registration.viceCaptainLastName.length > 0 
                    ? `${registration.viceCaptainFirstName} ${registration.viceCaptainLastName} (Vice-Captain)` 
                    : null}
                </td>
                <td>{registration.viceCaptainEmail}</td>
                <td>{registration.viceCaptainContactNumber}</td>
              </tr>
            </tbody>
          </table>
          <div className="border rounded p-4 mt-4">
            <h3 className="font-bold mb-2 text-lg md:text-xl">Team Details (Others):</h3>
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Contact</th>
                </tr>
              </thead>
              <tbody>
                {registration.teamMembers.map((member, idx) => (
                  <tr key={idx}>
                    <td>{`${member.firstName} ${member.lastName}`}</td>
                    <td>{member.email}</td>
                    <td>{member.contactNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SportsRegistrations;
