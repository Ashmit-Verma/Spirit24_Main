import React, { useEffect, useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import axios from 'axios';

const MultiStepForm = () => {
  const Navigate = useNavigate();
  const location = useLocation();
    const backgroundImages = {
        1: 'url("backgroundBlue.png")',
        2: 'url("bGreen.png")',
        3: 'url("background.png")',
      };

      const [step, setStep] = useState(1);
      const [googleId, setGoogleId] = useState("");

      const [formData, setFormData] = useState({
        instituteName: "",
        streetName: "",
        pincode: "",
        city: "",
        state: "",
        year: "",
        name: "",
        email: "",
        mobile: "",
        alternate_no: "",
        gender: "",
        position:"",
        participation: ""
      });
      const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            googleId: params.get("googleId"),
        };
    };
    const [errors, setErrors] = useState({});

    const validateStep = () => {
      let stepErrors = {};
      
      if (step === 1) {
        if (!formData.instituteName) stepErrors.instituteName = "Institute name is required";
        if(!formData.pincode) stepErrors.pincode = "Pincode is required";
        if (!formData.year) stepErrors.year = "Year of study is required";
        if(!formData.city) stepErrors.city = "City is required";
        if(!formData.state) stepErrors.state = "State is required";
      } else if (step === 2) {
        if (!formData.name) stepErrors.name = "Name is required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) stepErrors.email = "Valid email is required";
        if (!formData.mobile || formData.mobile.length !== 10) stepErrors.mobile = "Mobile number must be 10 digits";
        if (!formData.gender) stepErrors.gender = "Gender is required";
      } else if (step === 3) {
        if (!formData.position) stepErrors.position = "Position is required";
        if (!formData.participation) stepErrors.participation = "Participation detail is required";
      }
      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    };
  

    useEffect(() => {
        const { googleId } = getQueryParams();
        if (googleId) {
            setGoogleId(googleId);
          }
      //     else
      // Navigate("/login");
    }, [location]);
        
        const backgroundStyle = {
            backgroundImage: backgroundImages[step], // Replace with your actual image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          };
          const nextStep = () => {
            if (validateStep()) {
              setStep(step + 1);
            }
            else
            {}
          };
  const prevStep = () =>
    {
        setStep(step - 1);
    }
        

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        googleId: googleId, // Include the extracted googleId
    };
        // Send form data to backend using Axios
        console.log(dataToSubmit);
        const response = await axios.post('https://spirit24-main.onrender.com/register', dataToSubmit);
        if (response.status === 201) {
          alert("Form submitted successfully!");
          Navigate(`/registration?googleId=${googleId}`, { state: { googleId } });
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form.");
  };
}

  return (
    <div className="min-h-screen p-8 flex justify-center items-center"  style={backgroundStyle}>
      {/* <div className="m-auto bg-white rounded-xl shadow-lg overflow-hidden w-11/12 max-w-5xl h-auto md:h-[800px] md:flex"> */}
        {step === 1 && (
          <div className="min-h-screen flex justify-center items-center p-4 sm:p-8 md:p-16 lg:p-24">
          <div className="shadow-xl bg-white rounded-lg max-w-5xl w-full flex flex-col md:flex-row">
            {/* Left Section - Form */}
            <div className="p-8 w-full md:w-3/4">
              <h2 className="text-1xl font-bold mb-2">INSTITUTE DETAILS</h2>
              <p className="text-gray-600 mb-6 text-3xl">Enter your Institute details.</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Institute Name*</label>
                  <input
                    type="text"
                    placeholder="Enter your Institute name here"
                    value={formData.instituteName}
                    onChange={handleChange("instituteName")}
                    className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                    required
                  />
                  {errors.instituteName && <p className="text-red-500">{errors.instituteName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street Name</label>
                  <input
                    type="text"
                    placeholder="Enter your Street Name here"
                    value={formData.streetName}
                    onChange={handleChange("streetName")}
                    className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                  />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                    <input
                      type="text"
                      placeholder="Enter your Pincode here"
                      value={formData.pincode}
                      onChange={handleChange("pincode")}
                      className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                    />
                    {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      placeholder="Enter your City Name here"
                      value={formData.city}
                      onChange={handleChange("city")}
                      className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                    />
                    {errors.city && <p className="text-red-500">{errors.city}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    placeholder="Enter your State Name here"
                    value={formData.state}
                    onChange={handleChange("state")}
                    className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                  />
                  {errors.state && <p className="text-red-500">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year of study*</label>
                  <input
                    type="text"
                    placeholder="Enter your Year of Study"
                    value={formData.year}
                    onChange={handleChange("year")}
                    className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                  />
                  {errors.year && <p className="text-red-500">{errors.year}</p>}
                </div>
                <button
                  type="submit"
                  onClick={nextStep}
                  className="px-6 py-2 rounded-2xl border-4 hover:bg-[#E8E8E8] mt-4 text-black"
                >
                  Next &rarr;
                </button>
              </form>
            </div>
        
            {/* Right Section - Image */}
            <div className="hidden md:flex w-1/2 bg-cover bg-no-repeat rounded-r-lg relative p-4">
  <img
    src="playerBlue.png"
    alt="Spirit24"
    className="h-auto w-3/4 object-contain rounded-r-lg" 
  />
</div>
          </div>
        </div>
        
        )}
        {step === 2 && (
          <div className="min-h-screen flex justify-center items-center p-4 sm:p-8 md:p-16 lg:p-24">
          <div className="shadow-xl bg-white rounded-lg max-w-5xl w-full flex flex-col md:flex-row">
            {/* Left Section - Form */}
            <div className="p-8 w-full md:w-1/2">
              <h2 className="text-1xl font-bold mb-2">PERSONAL DETAILS</h2>
              <p className="text-gray-600 mb-6 text-3xl">Enter your personal information.</p>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Name here"
                    value={formData.name}
                    onChange={handleChange("name")}
                    className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                  />
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Email here"
                    value={formData.email}
                    onChange={handleChange("email")}
                    className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <div className="flex space-x-2">
                    <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer border-gray-300 
  ${formData.gender === 'male' ? 'bg-blue-200' : 'bg-[#E8E8E8]'} hover:bg-gray-100`}>

                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          onChange={handleChange("gender")}
                          className="hidden"
                        />
                        <span className="mr-2 bg-[#E8E8E8]">♂️</span> Male
                      </label>
                      <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer border-gray-300 
  ${formData.gender === 'female' ? 'bg-blue-200' : 'bg-[#E8E8E8]'} hover:bg-gray-100`}>
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={handleChange("gender")}
                          className="hidden"
                        />
                        <span className="mr-2">♀️</span> Female
                      </label>
                      {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone No.(WhatsApp)
                  </label>
                  <input
                    type="Number"
                    placeholder="Enter your Phone number here"
                    value={formData.mobile}
                    onChange={handleChange("mobile")}
                    className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                  />
                </div>
                {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Alternate No.
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your Alternate number here"
                    value={formData.alternate_no}
                    onChange={handleChange("alternate_no")}
                    className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                  />
                </div>
                <button
                  type="submit"
                  onClick={prevStep}
                  className="text-black px-6 py-2 rounded-2xl border-4 hover:bg-[#E8E8E8] mt-6 mr-2"
                >
                  Back &larr;
                </button>
                <button
                  type="submit"
                  onClick={nextStep}
                  className="text-black px-6 py-2 rounded-2xl border-4 hover:bg-[#E8E8E8] mt-4"
                >
                  Next &rarr;
                </button>
              </form>
            </div>
        
            {/* Right Section - Image */}
            <div className="hidden md:flex w-1/2 bg-cover bg-no-repeat rounded-r-lg relative p-4">
  <img
    src="playerGreen.png"
    alt="Spirit24"
    className="h-auto w-3/4 object-contain rounded-r-lg" 
  />
</div>
          </div>
        </div>
        
        )}
        {step === 3 && (
          <div className="min-h-screen flex justify-center items-center p-4 sm:p-8 md:p-16 lg:p-24">

         <div className="shadow-xl bg-white rounded-lg max-w-5xl w-full flex flex-col md:flex-row">
           {/* Left Section - Form */}
           <div className="p-8 w-full md:w-1/2">
             <h2 className="text-1xl font-bold mb-2">PARTICIPATION DETAILS</h2>
             <p className="text-gray-600 mb-6 text-3xl">Enter your participation details.</p>
             <form className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700">
                   Institute Name*
                 </label>
                 <input
                   type="text"
                   placeholder="Enter your Institute Name here"
                   value={formData.institute}
                   className="mt-1 block w-full border border-gray-300 bg-[#E8E8E8] placeholder-[#606060] rounded-md shadow-sm p-2"
                 />
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Your Position</label>
                   <div className="flex space-x-2">
                   <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer border-gray-300 
  ${formData.position === 'Coach' ? 'bg-blue-200' : 'bg-[#E8E8E8]'} hover:bg-gray-100`}>
                       <input
                         type="radio"
                         name="position"
                         value="Coach"
                         onChange={handleChange("position")}
                         className="hidden"
                       />
                       <span className="mr-2 bg-[#E8E8E8]">♂️</span> Coach
                     </label>
                     <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer border-gray-300 
  ${formData.position === 'Player' ? 'bg-blue-200' : 'bg-[#E8E8E8]'} hover:bg-gray-100`}>
                       <input
                         type="radio"
                         name="position"
                         value="Player"
                         onChange={handleChange("position")}
                         className="hidden"
                       />
                       <span className="mr-2">♀️</span> Player
                     </label>
                     {errors.position && <p className="text-red-500">{errors.position}</p>}
                   </div>
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Participate As</label>
                   <div className="flex space-x-2">
                   <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer border-gray-300 
  ${formData.participation === 'Contingent' ? 'bg-blue-200' : 'bg-[#E8E8E8]'} hover:bg-gray-100`}>
                       <input
                         type="radio"
                         name="participation"
                         value="Contingent"
                         onChange={handleChange("participation")}
                         className="hidden"
                       />
                       Contingent
                     </label>
                     <label className={`flex items-center px-4 py-2 border rounded-lg cursor-pointer border-gray-300 
  ${formData.participation === 'Team' ? 'bg-blue-200' : 'bg-[#E8E8E8]'} hover:bg-gray-100`}>
                       <input
                         type="radio"
                         name="participation"
                         value="Team"
                         onChange={handleChange("participation")}
                         className="hidden"
                       />
                       Team
                     </label>
                     {errors.participation && <p className="text-red-500">{errors.participation}</p>}
                   </div>
                 </div>
               </div>
               <button
                 type="submit"
                 onClick={prevStep}
                 className="text-black px-6 py-2 rounded-2xl border-4 hover:bg-[#E8E8E8] mt-8 mr-2"
               >
                 Back &larr;
               </button>
               <button
                 type="submit"
                 onClick={handleSubmit}
                 className="text-black px-6 py-2 rounded-2xl border-4 hover:bg-[#E8E8E8] mt-4"
               >
                 Submit
               </button>
             </form>
           </div>
       
           {/* Right Section - Image */}
           <div className="hidden md:flex w-1/2 bg-cover bg-no-repeat rounded-r-lg relative p-4">
  <img
    src="playerRed.png"
    alt="Spirit24"
    className="h-auto w-3/4 object-contain rounded-r-lg" 
  />
</div>
         </div>
       </div>
       
        )}
      </div>
    // </div>
  );
};

export default MultiStepForm;
