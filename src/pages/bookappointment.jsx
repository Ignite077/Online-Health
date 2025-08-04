import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaFilter } from 'react-icons/fa';
import '../assets/styles/bookAppointment.css'; // your CSS file
import { Main_logo, Nav } from './home'; // Adjust the import path as necessary
const doctorsData = [
  {
    id: 1,
    name: "Dr. Rina Saha",
    specialization: "Cardiologist",
    location: "Kolkata",
    experience: 12,
    gender: "Female",
    available: "Morning",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Dr. Anil Sharma",
    specialization: "Dermatologist",
    location: "Delhi",
    experience: 5,
    gender: "Male",
    available: "Evening",
    image: "https://randomuser.me/api/portraits/men/34.jpg"
  },
  {
    id: 3,
    name: "Dr. Priya Desai",
    specialization: "Gynecologist",
    location: "Mumbai",
    experience: 15,
    gender: "Female",
    available: "Afternoon",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    name: "Dr. Raj Malhotra",
    specialization: "Orthopedic",
    location: "Chennai",
    experience: 18,
    gender: "Male",
    available: "Morning",
    image: "https://randomuser.me/api/portraits/men/48.jpg"
  },
  {
    id: 5,
    name: "Dr. Sneha Verma",
    specialization: "Pediatrician",
    location: "Kolkata",
    experience: 8,
    gender: "Female",
    available: "Evening",
    image: "https://randomuser.me/api/portraits/women/25.jpg"
  },
  {
    id: 6,
    name: "Dr. Abhishek Banerjee",
    specialization: "Neurologist",
    location: "Hyderabad",
    experience: 20,
    gender: "Male",
    available: "Morning",
    image: "https://randomuser.me/api/portraits/men/77.jpg"
  },
  {
    id: 7,
    name: "Dr. Kavita Mehta",
    specialization: "ENT Specialist",
    location: "Bangalore",
    experience: 6,
    gender: "Female",
    available: "Afternoon",
    image: "https://randomuser.me/api/portraits/women/10.jpg"
  },
  {
    id: 8,
    name: "Dr. Nikhil Patil",
    specialization: "General Physician",
    location: "Delhi",
    experience: 11,
    gender: "Male",
    available: "Evening",
    image: "https://randomuser.me/api/portraits/men/53.jpg"
  },
  {
    id: 9,
    name: "Dr. Aarti Kaur",
    specialization: "Psychiatrist",
    location: "Mumbai",
    experience: 14,
    gender: "Female",
    available: "Morning",
    image: "https://randomuser.me/api/portraits/women/36.jpg"
  },
  {
    id: 10,
    name: "Dr. Manish Thakur",
    specialization: "Urologist",
    location: "Chennai",
    experience: 9,
    gender: "Male",
    available: "Afternoon",
    image: "https://randomuser.me/api/portraits/men/84.jpg"
  },
  {
    id: 11,
    name: "Dr. Sushmita Roy",
    specialization: "Oncologist",
    location: "Hyderabad",
    experience: 13,
    gender: "Female",
    available: "Evening",
    image: "https://randomuser.me/api/portraits/women/83.jpg"
  },
  {
    id: 12,
    name: "Dr. Sameer Jain",
    specialization: "Nephrologist",
    location: "Bangalore",
    experience: 10,
    gender: "Male",
    available: "Morning",
    image: "https://randomuser.me/api/portraits/men/26.jpg"
  },
  {
    id: 13,
    name: "Dr. Meenakshi Joshi",
    specialization: "Dentist",
    location: "Mumbai",
    experience: 16,
    gender: "Female",
    available: "Morning",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];


const itemsPerPage = 4;
Modal.setAppElement('#root');

export default function BookAppointment() {
  const [filter, setFilter] = useState({ specialization: "", gender: "", location: "", exp10: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", time: "", reason: "" });

  useEffect(() => {
    if (window.innerWidth < 768) setSidebarVisible(false);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilter(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredDoctors = doctorsData.filter(doc =>
    (filter.specialization === "" || doc.specialization === filter.specialization) &&
    (filter.gender === "" || doc.gender === filter.gender) &&
    (filter.location === "" || doc.location === filter.location) &&
    (!filter.exp10 || doc.experience >= 10) &&
    (searchTerm === "" || doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageList = () => {
    const pages = [];
    if (totalPages <= 7) return [...Array(totalPages)].map((_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3) return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked with ${selectedDoctor.name}`);
    setModalOpen(false);
    setFormData({ name: "", date: "", time: "", reason: "" });
  };

  return (

    <div className="book-container">
        <Main_logo />
        <Nav />
      <div className="filter-icon" onClick={() => setSidebarVisible(!sidebarVisible)}>
        <FaFilter />
      </div>

      <div className="content-wrapper">
        <div className={`sidebar ${sidebarVisible ? "show" : "hide"}`}>
          <h2>Filter</h2>

          <label>Department:</label>
          <select name="specialization" value={filter.specialization} onChange={handleFilterChange}>
            <option value="">All</option>
            {[...new Set(doctorsData.map(doc => doc.specialization))].map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>

          <label>Gender:</label>
          <select name="gender" value={filter.gender} onChange={handleFilterChange}>
            <option value="">All</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <label>Location:</label>
          <select name="location" value={filter.location} onChange={handleFilterChange}>
            <option value="">All</option>
            {[...new Set(doctorsData.map(doc => doc.location))].map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

            <div className="checkbox-row">
            <input
                type="checkbox"
                name="exp10"
                id="exp10"
                checked={filter.exp10}
                onChange={handleFilterChange}
            />
            <label htmlFor="exp10">Experience ≥ 10 yrs</label>
            </div>

        </div>

        <div className="doctor-list">
          <input
            type="text"
            placeholder="Search doctor or department..."
            className="search-box"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          {paginatedDoctors.length ? (
            paginatedDoctors.map(doc => (
                <div key={doc.id} className="doctor-card">
                <img src={doc.image} alt={doc.name} className="doctor-img" />
                <h3>{doc.name}</h3>
                <p>Specialization: {doc.specialization}</p>
                <p>Location: {doc.location}</p>
                <p>Experience: {doc.experience} years</p>
                <p>Gender: {doc.gender}</p>
                <p>Available: {doc.available}</p>
                <button onClick={() => handleBook(doc)}>Book Appointment</button>
                </div>
            ))

          ) : (
            <p>No doctors found.</p>
          )}
/* */
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>&#x2039;</button>
            {getPageList().map((page, i) =>
              page === "..." ? <span key={i} className="dots">...</span> : (
                <button
                  key={i}
                  className={page === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >{page}</button>
              )
            )}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>&#x203A;</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Book Appointment"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Book with {selectedDoctor?.name}</h2>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <input required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
          <input required type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} />
          <textarea required placeholder="Reason for visit" value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })}></textarea>
          <button type="submit">Confirm Booking</button>
        </form>
      </Modal>
    </div>
  );
}
