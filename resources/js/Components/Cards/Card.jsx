const Card = ({ title, value, Icon, subText }) => {
    return (
        <div
            className="bg-gray-50
        shadow-lg rounded-xl p-6
        flex items-center flex-col md:flex-row space-x-4
         hover:shadow-xl cursor-pointer
         transition-shadow duration-300
         "
        >
            <div className="p-3 bg-gray-900 text-white rounded-full">
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-gray-800  text-sm text-center md:text-start mt-2 md:mt-0">
                    {title}
                </h3>
                <div className="flex items-baseline space-x-2 mt-1 justify-center md:justify-start">
                    <p className="text-xl font-semibold">{value}</p>
                    {subText && (
                        <span className="text-sm text-gray-400">{subText}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
