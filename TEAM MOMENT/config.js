

const MainContent = () => (
  <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
    <header className="flex justify-between items-center mb-8">
      <input type="text" placeholder="Search for Projects, tasks, payments..." 
             className="w-1/2 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" />
      <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-blue-700">
        Add New Tasks
      </button>
    </header>

    {/* Profile Section */}
    <section className="mb-12">
      <div className="h-44 bg-slate-900 rounded-3xl relative mb-14">
        {/* Avatar with the New Blue Border */}
        <div className="absolute -bottom-10 left-8">
          <div className="w-24 h-24 rounded-full border-4 border-blue-600 overflow-hidden bg-white">
            <img src="profile-img.jpg" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-slate-800">Hello Stanley,</h1>
      <p className="text-slate-500 font-medium">A creative Designer / Web Developer • Los Angeles, California</p>
      
      <div className="flex gap-2 mt-4">
        {['UI Design', 'HTML', 'CSS', 'JavaScript'].map(skill => (
          <span key={skill} className="px-4 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-slate-600">
            {skill}
          </span>
        ))}
      </div>
    </section>
  </main>
);