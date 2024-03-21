import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [formData, setFormData] = useState({
    userName: '',
    languageId: '', // Default to empty string
    stdIn: '',
    sourceCode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const navigate = useNavigate();

  // Load preferred language from local storage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) {
      setFormData((prevData) => ({ ...prevData, languageId: storedLanguage }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true while submitting

    try {
      // Send POST request using Axios
      const response = await axios.post('http://13.233.89.137:3000/submission', formData);

      console.log(response.data); // Log response data if needed

      setIsLoading(false); // Reset loading state
      setSubmissionMessage('Submission successful'); // Set success message

      // Reset form fields only if submission is successful
      setFormData({
        userName: '',
        languageId: '', // Reset preferred language to empty string
        stdIn: '',
        sourceCode: '',
      });

      // Clear submission message after 3 seconds
      setTimeout(() => {
        setSubmissionMessage('');
      }, 3000);
    } catch (error) {
      setIsLoading(false); // Reset loading state
      console.error('Error:', error); // Log any errors
      setSubmissionMessage('Submission failed'); // Set error message
    }
  };

  // Handle change in preferred language
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setFormData({ ...formData, languageId: selectedLanguage });
    localStorage.setItem('preferredLanguage', selectedLanguage); // Store selected language in local storage
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label htmlFor="preferredLanguage">Preferred Language:</label>
          <select
            id="preferredLanguage"
            name="languageId"
            value={formData.languageId}
            onChange={handleLanguageChange}
            required
          >
            <option value="">Select Language</option>
            <option value="53">C++</option>
            <option value="62">Java</option>
            <option value="63">JavaScript</option>
            <option value="70">Python</option>
          </select>
        </div>
        <div>
          <label htmlFor="stdin">Stdin:</label>
          <input
            type="text"
            id="stdin"
            name="stdIn"
            value={formData.stdIn}
            onChange={handleChange}
            placeholder="Enter stdin"
            required
          />
        </div>
        <div>
          <label htmlFor="sourceCode">Source Code:</label>
          <textarea
            id="sourceCode"
            name="sourceCode"
            value={formData.sourceCode}
            onChange={handleChange}
            placeholder="Enter source code"
            style={{ maxHeight: '60vh' }}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
}

export default FormPage;









// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function FormPage() {
//   const [formData, setFormData] = useState({
//     username: '',
//     preferredLanguage: '',
//     stdin: '',
//     sourceCode: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [submissionMessage, setSubmissionMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
      
//       const formDataToSend = {
//         userName: formData.username,
//         languageId: formData.preferredLanguage,
//         stdIn: formData.stdin,
//         sourceCode: formData.sourceCode,
//       };

      
//       console.log(formDataToSend);
//       const response = await axios.post('http://13.233.89.137:3000/submission', formDataToSend);

//       console.log(response.data); 

//       setIsLoading(false); 
//       setSubmissionMessage('Submission successful'); 

      
//       setFormData({
//         username: '',
//         preferredLanguage: '',
//         stdin: '',
//         sourceCode: '',
//       });

      
//       setTimeout(() => {
//         setSubmissionMessage('');
//       }, 3000);
//     } catch (error) {
//       setIsLoading(false); 
//       setSubmissionMessage('Submission failed'); 
//       console.error('Error:', error); 
//       setTimeout(() => {
//         setSubmissionMessage('');
//       }, 3000);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//                <div>
//            <label htmlFor="username">Username:</label>
//            <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder="Enter username"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="preferredLanguage">Preferred Language:</label>
//           <input
//             type="radio"
//             id="preferredLanguage"
//             name="preferredLanguage"
//             value={formData.preferredLanguage}
//             onChange={handleChange}
//             placeholder="Enter preferred language"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="stdin">Stdin:</label>
//           <input
//             type="text"
//             id="stdin"
//             name="stdin"
//             value={formData.stdin}
//             onChange={handleChange}
//             placeholder="Enter stdin"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="sourceCode">Source Code:</label>
//           <textarea
//             id="sourceCode"
//             name="sourceCode"
//             value={formData.sourceCode}
//             onChange={handleChange}
//             placeholder="Enter source code"
//             style={{ maxHeight: '60vh' }}
//             required
//           />
//          </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Submitting...' : 'Submit'}
//         </button>
//       </form>
//       {submissionMessage && <p>{submissionMessage}</p>}
//     </div>
//   );
// }

// export default FormPage;

