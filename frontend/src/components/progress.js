import React, { useState ,useEffect} from 'react';
import { useLocation,useNavigate} from "react-router-dom";
import axios from 'axios';

const MultiStepForm = () => {
  const Navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  const [googleId,setGoogleId]=useState('');
  const [formData, setFormData] = useState({
    sport: '',
    captain: { firstName: '', lastName: '', email: '', contactNumber: '' },
    viceCaptain: { firstName: '', lastName: '', email: '', contactNumber: '' },
    teamMembers: [{ firstName: '', lastName: '' ,email:'',contactNumber: ''}]
  });


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
    else
    Navigate("/login");
}, [location]);

  const handleInputChange = (step, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [step]: { ...prevData[step], [field]: value }
    }));
  };

  const handleTeamMemberChange = (index, field, value) => {
    const newTeamMembers = [...formData.teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    setFormData(prevData => ({ ...prevData, teamMembers: newTeamMembers }));
  };

  const addTeamMember = () => {
    setFormData(prevData => ({
      ...prevData,
      teamMembers: [...prevData.teamMembers, { firstName: '', lastName: '' }]
    }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));


  const handleSubmitForm = async () => {
    try {
      const response = await axios.post('http://localhost:4000/sportsRegister', {
        sport: formData.sport,
        captain: formData.captain,
        viceCaptain: formData.viceCaptain,
        teamMembers: formData.teamMembers,
        googleId,
      });

      if(response.status===201)
      {
        console.log('Form submitted:');
        Navigate(`/registered-sports?googleId=${googleId}`, { state: { googleId } });

      }
      else
         console.log("Internal Server Error");
      // Optionally reset form or show success message
    } catch (error) {
      alert('Error submitting form');
      Navigate(`/registration?googleId=${googleId}`, { state: { googleId } });
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
  {['Football (Men)', 'Cricket (Men)', 'Basketball (Men)', 'Basketball (Women)', 'Tennis (Men)', 'Tennis (Women)', 'Table Tennis (Men)', 'Table Tennis (Women)', 'Kho-kho (Men)', 'Kho-kho (Women)', 'Volleyball (Men)', 'Volleyball (Women)', 'Hockey (Men)', 'Swimming (Individual)', 'Athletics (Men)', 'Carrom (Men)', 'Yoga', 'Water Polo (Men)', 'Chess', 'Squash (Men)', 'Squash (Women)', 'Kabaddi (Men)', 'Weight Lifting (Men)'].map((sport) => (
    <button
      key={sport}
      className={`p-6 md:p-8 lg:p-10 border-2 rounded-lg transition-colors duration-200 ease-in-out 
      ${formData.sport === sport ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:bg-gray-100'}`}
      onClick={() => setFormData(prev => ({ ...prev, sport }))}
    >
      {sport}
    </button>
  ))}
</div>

        );
      case 2:
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Captain's Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="p-2 border rounded bg-[#E8E8E8]"
                  placeholder="First Name"
                  value={formData.captain.firstName}
                  onChange={(e) => handleInputChange('captain', 'firstName', e.target.value)}
                />
                <input
                  className="p-2 border rounded bg-[#E8E8E8]"
                  placeholder="Last Name"
                  value={formData.captain.lastName}
                  onChange={(e) => handleInputChange('captain', 'lastName', e.target.value)}
                />
              </div>
              <input
                className="p-2 border rounded w-full mt-4 bg-[#E8E8E8]"
                placeholder="Email"
                type="email"
                value={formData.captain.email}
                onChange={(e) => handleInputChange('captain', 'email', e.target.value)}
              />
              <input
                className="p-2 border rounded w-full mt-4 bg-[#E8E8E8]"
                placeholder="Contact Number"
                type="tel"
                value={formData.captain.contactNumber}
                onChange={(e) => handleInputChange('captain', 'contactNumber', e.target.value)}
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">Vice-Captain's Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="p-2 border rounded bg-[#E8E8E8]"
                  placeholder="First Name"
                  value={formData.viceCaptain.firstName}
                  onChange={(e) => handleInputChange('viceCaptain', 'firstName', e.target.value)}
                />
                <input
                  className="p-2 border rounded bg-[#E8E8E8]"
                  placeholder="Last Name"
                  value={formData.viceCaptain.lastName}
                  onChange={(e) => handleInputChange('viceCaptain', 'lastName', e.target.value)}
                />
              </div>
              <input
                className="p-2 border rounded w-full  mt-4 bg-[#E8E8E8]"
                placeholder="Email"
                type="email"
                value={formData.viceCaptain.email}
                onChange={(e) => handleInputChange('viceCaptain', 'email', e.target.value)}
              />
              <input
                className="p-2 border rounded w-full mt-4 bg-[#E8E8E8]"
                placeholder="Contact Number"
                type="tel"
                value={formData.viceCaptain.contactNumber}
                onChange={(e) => handleInputChange('viceCaptain', 'contactNumber', e.target.value)}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full">
  <p className="text-sm text-red-500 mb-4">Please add players, including Captain and Vice-captain.</p>
  {formData.teamMembers.map((member, index) => (
    <div key={index} className="flex flex-col gap-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-7">
        <input
          className="p-2 border rounded w-full bg-[#E8E8E8] sm:max-w-[20%] md:max-w-[25%] lg:max-w-[30%]"
          placeholder="First Name"
          value={member.firstName}
          onChange={(e) => handleTeamMemberChange(index, 'firstName', e.target.value)}
        />
        <input
          className="p-2 border rounded bg-[#E8E8E8] w-full sm:max-w-[20%] md:max-w-[25%] lg:max-w-[30%]"
          placeholder="Last Name"
          value={member.lastName}
          onChange={(e) => handleTeamMemberChange(index, 'lastName', e.target.value)}
        />
        <input
          className="p-2 border rounded bg-[#E8E8E8] w-full sm:max-w-[30%] md:max-w-[35%] lg:max-w-[40%]"
          placeholder="Email"
          value={member.email}
          onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
        />
        <input
          className="p-2 border rounded bg-[#E8E8E8] w-full sm:max-w-[30%] md:max-w-[35%] lg:max-w-[40%]"
          placeholder="Contact Number"
          value={member.contactNumber}
          onChange={(e) => handleTeamMemberChange(index, 'contactNumber', e.target.value)}
        />
      </div>
    </div>
  ))}
  <button
    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
    onClick={addTeamMember}
  >
    ADD MORE
  </button>
</div>

        );
      case 4:
        return (
          <div>
            <p className="text-sm text-red-500 mb-4">Please Confirm your Details...</p>
            <p className="mb-2">Note : Type is only required for Athletics, Weight-Lifting, and Power-Lifting.</p>
            <div className="border rounded p-4 mb-4">
              <h3 className="font-bold mb-2">Selected Sport: {formData.sport}</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{`${formData.captain.firstName} ${formData.captain.lastName}`}</td>
                    <td>{formData.captain.email}</td>
                    <td>{formData.captain.contactNumber}</td>
                  </tr>
                  <tr>
                    <td>{`${formData.viceCaptain.firstName} ${formData.viceCaptain.lastName}`}</td>
                    <td>{formData.viceCaptain.email}</td>
                    <td>{formData.viceCaptain.contactNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-bold mb-2">Team Details:</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Email</th>
                    <th className="text-left">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.teamMembers.map((member, index) => (
                    <tr key={index}>
                      <td>{`${member.firstName} ${member.lastName}`}</td>
                      <td>{`${member.email}`}</td>
                      <td>{`${member.contactNumber}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      
      
      <div className="mb-8">
        <div className="relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-gray-300">
            <div 
              className="h-full bg-orange-500 transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            ></div>
          </div>
          <div className="relative flex justify-between">
            {['CHOOSE SPORTS', 'GENRAL INFORMATION', 'ADD TEAM MEMBER', 'CONFIRM'].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    index < currentStep
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-white border-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <div className={`mt-2 text-xs font-medium uppercase ${
                  index === currentStep - 1 ? 'text-orange-500' : 'text-gray-500'
                }`}>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">
        {currentStep === 1 && "Register for a Sport"}
        {currentStep === 2 && "Provide Details of Captain and Vice-Captain"}
        {currentStep === 3 && "Add Team members"}
        {currentStep === 4 && "Confirm Submission"}
      </h1>
      {currentStep === 1 && <p className="text-sm text-red-500 mb-4">Register for one Sport at a time.</p>}
      
      <div className="mb-8 w-full">
        {renderStep()}
      </div>
      
      <div className="flex justify-between">
        {currentStep > 1 && (
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={prevStep}
          >
            Back
          </button>
        )}
        {currentStep < 4 ? (
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ml-auto"
            onClick={nextStep}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 ml-auto"
            onClick={handleSubmitForm}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;