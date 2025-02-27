import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
  image?: string;
  registrationLink?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  location,
  description,
  image = "/images/image.png",
  registrationLink,
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-indigo-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-lg bg-blue-800 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-800 to-indigo-800 opacity-80"></div>
              <img
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-70"
              />
            </div>
            </div>
          <div className="lg:w-2/3">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
              {date}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            {time && <h3 className="text-xl text-blue-300 mb-2">{time}</h3>}
            {location && <h3 className="text-xl text-blue-300 mb-6">{location}</h3>}
            <p className="text-gray-200 mb-6 leading-relaxed">
              {description}
            </p>
            {registrationLink && (
              <div className="flex flex-wrap gap-4">
                {/* <a
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 hover:bg-gray-900 font-bold py-2 px-6 rounded-lg"
                >
                  Register Now
                </a> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCard;