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

  const [errors, setErrors] = useState({
    captain: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
    },
    viceCaptain: {
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
    },
    teamMembers: [],
  });
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateContactNumber = (number) => /^[0-9]{10}$/.test(number); // Adjust based on your contact number format

const handleInputChange = (role, field, value) => {
  let newErrors = { ...errors };

  // Validation logic for Captain and Vice-Captain
  if (role === 'captain' || role === 'viceCaptain') {
    if (field === 'firstName' && value.trim() === '') {
      newErrors[role].firstName = "First name is required";
    } else {
      newErrors[role].firstName = ''; // Clear error if valid
    }

    // if (field === 'lastName' && value.trim() === '') {
    //   newErrors[role].lastName = "Last name is required";
    // } else {
    //   newErrors[role].lastName = '';
    // }

    if (field === 'email') {
      if (!validateEmail(value)) {
        newErrors[role].email = "Invalid email address";
      } else {
        newErrors[role].email = '';
      }
    }

    if (field === 'contactNumber') {
      if (!validateContactNumber(value)) {
        newErrors[role].contactNumber = "Contact number must be 10 digits";
      } else {
        newErrors[role].contactNumber = '';
      }
    }
  }

  setErrors(newErrors);
  setFormData((prev) => ({ ...prev, [role]: { ...prev[role], [field]: value } }));
};

const handleTeamMemberChange = (index, field, value) => {
  let newErrors = { ...errors };

  // Validation for team members
  if (!newErrors.teamMembers[index]) {
    newErrors.teamMembers[index] = {};
  }

  // Validation for team members
  if (field === 'firstName') {
    if (value.trim() === '') {
      newErrors.teamMembers[index].firstName = "First name is required";
    } else {
      delete newErrors.teamMembers[index].firstName;
    }
  }

  // if (field === 'lastName') {
  //   if (value.trim() === '') {
  //     newErrors.teamMembers[index].lastName = "Last name is required";
  //   } else {
  //     delete newErrors.teamMembers[index].lastName;
  //   }
  // }

  if (field === 'email') {
    if (!validateEmail(value)) {
      newErrors.teamMembers[index].email = "Invalid email address";
    } else {
      delete newErrors.teamMembers[index].email;
    }
  }

  if (field === 'contactNumber') {
    if (!validateContactNumber(value)) {
      newErrors.teamMembers[index].contactNumber = "Contact number must be 10 digits";
    } else {
      delete newErrors.teamMembers[index].contactNumber;
    }
  }

  setErrors(newErrors);
  setFormData((prev) => ({
    ...prev,
    teamMembers: prev.teamMembers.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    ),
  }));
};



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

const teamLimits = {
  'Athletics (Men)':{min:1,max:4},
  'Athletics (Women)':{min:1,max:4},
  'Badminton (Men)': { min: 4, max: 5 },
  'Badminton (Women)': { min: 2, max: 3 },
  'Basketball (Men)': { min: 5, max: 12 },
  'Basketball (Women)': { min: 5, max: 12 },
  'Carrom':{min:2,max:5},
  'Chess':{min:2,max:5},
  'Cricket (Men)':{min:11,max:16},
  'Football (Men)': { min: 11, max: 16 },
  'Hockey (Men)': { min: 11, max: 16 },
  'Kabaddi (Men)': {min:7,max:12},
  'Kho-kho (Men)':{min:9,max:12},
  'Lawn Tennis (Men)':{min:2,max:4},
  'Lawn Tennis (Women)':{min:2,max:4},
  'Table Tennis (Men)':{min:3,max:4},
  'Table Tennis (Women)':{min:2,max:4},
  'Squash (Men)':{min:2,max:4},
  'Squash (Women)':{min:2,max:4},
  'Volleyball (Men)':{min:7,max:12},
  'Volleyball (Women)':{min:7,max:12},
  'Weight Lifting (Men)':{min:1,max:1},
  'Water Polo (Men)':{min:7,max:13},
  'Swimming (Individual)': {min:1,max:4},

};


  // const handleInputChange = (step, field, value) => {
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [step]: { ...prevData[step], [field]: value }
  //   }));
  // };

  // const handleTeamMemberChange = (index, field, value) => {
  //   const newTeamMembers = [...formData.teamMembers];
  //   newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
  //   setFormData(prevData => ({ ...prevData, teamMembers: newTeamMembers }));
  // };

  const addTeamMember = () => {
    const sportLimits = teamLimits[formData.sport];

    if (sportLimits) {
      const { min, max } = sportLimits;
  
      // Check if current team members are less than max
      if (formData.teamMembers.length < max) {
        setFormData(prevData => ({
          ...prevData,
          teamMembers: [...prevData.teamMembers, { firstName: '', lastName: '' }]
        }));
      } else {
        alert(`Maximum number of team members for ${formData.sport} is ${max}.`);
      }
    }
  };

  const removeTeamMember = (index) => {
    setFormData(prevData => ({
      ...prevData,
      teamMembers: prevData.teamMembers.filter((_, i) => i !== index) // Filter out the member at the specified index
    }));
  };
  

  const nextStep = () => {
    let formIsValid2 = true; // Initialize validation flag
  
    if (currentStep === 1 && !formData.sport) {
      alert(`You must select a sport`);
      formIsValid2 = false; // Set to false if validation fails
    } else if (currentStep === 2) {
      // Check captain and vice-captain errors
      const captainErrors = Object.values(errors.captain).some(e => e);
        const viceCaptainErrors = Object.values(errors.viceCaptain).some(e => e);

        // Validate captain fields
        const isCaptainValid = Object.values(formData.captain).every(field => field.trim() !== '');
        // Validate vice-captain fields
        const isViceCaptainValid = Object.values(formData.viceCaptain).every(field => field.trim() !== '');

        if (captainErrors || viceCaptainErrors || !isCaptainValid || !isViceCaptainValid) {
            alert("Please fix captain and/or vice-captain errors and ensure all fields are filled."); // Alert if there are errors
            formIsValid2 = false; // Set to false if there // Set to false if there are errors
      }
    } else if (currentStep === 3) {
      // Validate team members
      const isTeamMembersValid = formData.teamMembers.length >= teamLimits[formData.sport].min;
    const teamMemberErrors = errors.teamMembers.some(error => Object.values(error).some(e => e));

    // Check if all required fields for each team member are filled
    const areAllMembersFilled = formData.teamMembers.every((member, index) => {
      const memberErrors = errors.teamMembers[index] || {};
      const hasEmptyFields = ['firstName', 'email', 'contactNumber'].some(field => !member[field] || memberErrors[field]);
      return !hasEmptyFields; // Returns true if no empty fields, false if any are empty
    });

    if (!isTeamMembersValid || teamMemberErrors || !areAllMembersFilled) {
      alert(`You must add at least ${teamLimits[formData.sport].min} team members with valid information before proceeding to the next step.`);
      formIsValid2 = false; // Set to false if validation fails
    }
    }
  
    // Move to next step only if formIsValid2 is still true
    if (formIsValid2) {
      setCurrentStep(prev => Math.min(prev + 1, 4)); // Proceed to the next step
    }
  };
  
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));


  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    
    // Validate captain and vice captain
    Object.values(errors.captain).forEach(error => {
      if (error)
        {
          formIsValid = false;
          console.log("Error in captain");
          console.log(error);
        } 
    });
    Object.values(errors.viceCaptain).forEach(error => {
      if (error) 
        {
          formIsValid = false;
          console.log("Error in Vice Captain");
          console.log(error);
        }
    });
    errors.teamMembers.forEach((error, index) => {
      if (error && Object.keys(error).length > 0) {
          formIsValid = false; // Set formIsValid to false if there's any error
          console.log(`Error in team member ${index + 1}:`, error);
      }

    });
    if(formIsValid)
    {
      try {
        const response = await axios.post('https://spirit24-main.onrender.com/sportsRegister', {
          sport: formData.sport,
          captain: formData.captain,
          viceCaptain: formData.viceCaptain,
          teamMembers: formData.teamMembers,
          googleId,
        });
        // const response = await axios.post('http://localhost:4001/sportsRegister', {
        //     sport: formData.sport,
        //     captain: formData.captain,
        //     viceCaptain: formData.viceCaptain,
        //     teamMembers: formData.teamMembers,
        //     googleId,
        //   });
        
  
        if(response.status===201)
        {
          console.log('Form submitted:');
          Navigate(`/registered-sports?googleId=${googleId}`, { state: { googleId } });
  
        }
        else
           console.log("Internal Server Error");
        // Optionally reset form or show success message
      } catch (error) {
        console.log(error);
        alert('Error submitting form');
        Navigate(`/registration?googleId=${googleId}`, { state: { googleId } });
      }
    }
    else
    {
      alert('Please fix the errors in the form before submitting.');
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Football (Men)', 'Cricket (Men)','Badminton (Men)','Badminton (Women)', 'Basketball (Men)', 'Basketball (Women)', 'Lawn Tennis (Men)', 'Lawn Tennis (Women)', 'Table Tennis (Men)', 'Table Tennis (Women)', 'Kho-kho (Men)', 'Kho-kho (Women)', 'Volleyball (Men)', 'Volleyball (Women)', 'Hockey (Men)', 'Swimming (Individual)', 'Athletics (Men)', 'Carrom', 'Yoga', 'Water Polo (Men)', 'Chess', 'Squash (Men)', 'Squash (Women)', 'Kabaddi (Men)', 'Weight Lifting (Men)']
            .sort()
            .map((sport) => (
              <button
                key={sport}
                className={`p-6 md:p-8 lg:p-10 border-2 rounded-xl transition-colors duration-200 ease-in-out 
                ${formData.sport === sport ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:bg-gray-100'}`}
                onClick={() => setFormData(prev => ({ ...prev, sport }))}
              >
                <img src={`${sport}.png`} alt={sport}></img>
                <p className='font-fireSans rounded-lg border-2 mt-2'>{sport}</p>
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
                type="text"
                  className="p-2 border rounded bg-[#E8E8E8]"
                  placeholder="First Name"
                  value={formData.captain.firstName}
                  onChange={(e) => handleInputChange('captain', 'firstName', e.target.value)}
                  required
                />
                {errors.captain.firstName && <p className="text-red-500">{errors.captain.firstName}</p>}
                <input
                  type="text"
                  className="p-2 border rounded bg-[#E8E8E8]"
                  placeholder="Last Name"
                  value={formData.captain.lastName}
                  onChange={(e) => handleInputChange('captain', 'lastName', e.target.value)}
                  required
                />
              </div>
              {errors.captain.lastName && <p className="text-red-500">{errors.captain.lastName}</p>}
              <input
                className="p-2 border rounded w-full mt-4 bg-[#E8E8E8]"
                placeholder="Email"
                type="email"
                value={formData.captain.email}
                onChange={(e) => handleInputChange('captain', 'email', e.target.value)}
                required
              />
              {errors.captain.email && <p className="text-red-500">{errors.captain.email}</p>}
              <input
                className="p-2 border rounded w-full mt-4 bg-[#E8E8E8]"
                placeholder="Contact Number"
                type="tel"
                value={formData.captain.contactNumber}
                onChange={(e) => handleInputChange('captain', 'contactNumber', e.target.value)}
                required
              />
              {errors.captain.contactNumber && <p className="text-red-500">{errors.captain.contactNumber}</p>}
            </div>
            <div>
              <h3 className="font-bold mb-2">Vice-Captain's Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="p-2 border rounded bg-[#E8E8E8]"
                  placeholder="First Name"
                  value={formData.viceCaptain.firstName}
                  onChange={(e) => handleInputChange('viceCaptain', 'firstName', e.target.value)}
                  required
                />
                {errors.viceCaptain.firstName && <p className="text-red-500">{errors.viceCaptain.firstName}</p>}
                <input
                  className="p-2 border rounded bg-[#E8E8E8]"
                  placeholder="Last Name"
                  value={formData.viceCaptain.lastName}
                  onChange={(e) => handleInputChange('viceCaptain', 'lastName', e.target.value)}
                  required
                />
                {errors.viceCaptain.lastName && <p className="text-red-500">{errors.viceCaptain.lastName}</p>}
              </div>
              <input
                className="p-2 border rounded w-full  mt-4 bg-[#E8E8E8]"
                placeholder="Email"
                type="email"
                value={formData.viceCaptain.email}
                onChange={(e) => handleInputChange('viceCaptain', 'email', e.target.value)}
                required
              />
              {errors.viceCaptain.email && <p className="text-red-500">{errors.viceCaptain.email}</p>}
              <input
                className="p-2 border rounded w-full mt-4 bg-[#E8E8E8]"
                placeholder="Contact Number"
                type="tel"
                value={formData.viceCaptain.contactNumber}
                onChange={(e) => handleInputChange('viceCaptain', 'contactNumber', e.target.value)}
                required
              />
              {errors.viceCaptain.contactNumber && <p className="text-red-500">{errors.viceCaptain.contactNumber}</p>}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full">
  <p className="text-sm text-red-500 mb-4">Please add players, including Captain and Vice-captain. Leave out Vice-captain for individual Sports</p>
  {formData.teamMembers.map((member, index) => (
    <div key={index} className="flex flex-col gap-4 mb-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-7">
      {errors.teamMembers[index]?.firstName && (
        <p className="text-red-500">{errors.teamMembers[index].firstName}</p>
      )}
        <input
          className="p-2 border rounded w-full bg-[#E8E8E8] sm:max-w-[20%] md:max-w-[25%] lg:max-w-[30%]"
          placeholder="First Name"
          value={member.firstName}
          onChange={(e) => handleTeamMemberChange(index, 'firstName', e.target.value)}
          required
        />
       {errors.teamMembers[index]?.lastName && (
        <p className="text-red-500">{errors.teamMembers[index].lastName}</p>
      )}
        <input
          className="p-2 border rounded bg-[#E8E8E8] w-full sm:max-w-[20%] md:max-w-[25%] lg:max-w-[30%]"
          placeholder="Last Name"
          value={member.lastName}
          onChange={(e) => handleTeamMemberChange(index, 'lastName', e.target.value)}
          required
        />
        {errors.teamMembers[index]?.email && (
        <p className="text-red-500">{errors.teamMembers[index].email}</p>
      )}
        <input
          className="p-2 border rounded bg-[#E8E8E8] w-full sm:max-w-[30%] md:max-w-[35%] lg:max-w-[40%]"
          placeholder="Email"
          value={member.email}
          onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
          required
        />
        {errors.teamMembers[index]?.contactNumber && (
        <p className="text-red-500">{errors.teamMembers[index].contactNumber}</p>
      )}
        <input
          className="p-2 border rounded bg-[#E8E8E8] w-full sm:max-w-[30%] md:max-w-[35%] lg:max-w-[40%]"
          placeholder="Contact Number"
          value={member.contactNumber}
          onChange={(e) => handleTeamMemberChange(index, 'contactNumber', e.target.value)}
          required
        />
        <button
        className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => removeTeamMember(index)}
      >
        REMOVE
      </button>
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
                    <td>{`${formData.captain.firstName} ${formData.captain.lastName}(C)`}</td>
                    <td>{formData.captain.email}</td>
                    <td>{formData.captain.contactNumber}</td>
                  </tr>
                  <tr>
                    <td>{`${formData.viceCaptain.firstName} ${formData.viceCaptain.lastName}(VC)`}</td>
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
      {currentStep === 2 && <p className="text-sm text-red-500 mb-4">For individual sports enter same details for captain and vice-captain</p>}
      
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