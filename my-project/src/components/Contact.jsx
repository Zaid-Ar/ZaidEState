import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
  const [landlord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact
            <span>{landlord.username}</span>
            for
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            placeholder="enter your text here"
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link className="bg-slate-700 text-white  text-center p-3 uppercase rounded-lg hover:opacity-95" to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}>
           Send Message
          </Link>
        </div>
      )}
    </>
  );
}
