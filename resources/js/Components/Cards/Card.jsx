const Card = ({ title, value, Icon, subText, valueColor }) => {
    return (
        <div
            className="bg-white border border-gray-100
        shadow-sm rounded-xl p-6
        flex items-center flex-col md:flex-row md:items-center space-x-0 md:space-x-4 space-y-3 md:space-y-0
        hover:shadow-md cursor-pointer
        transition-shadow duration-300"
        >
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-gray-500 text-sm text-center md:text-start">
                    {title}
                </h3>
                <div className="flex items-baseline space-x-2 mt-1 justify-center md:justify-start">
                    <p
                        className={`text-xl font-semibold ${
                            valueColor || "text-gray-900"
                        }`}
                    >
                        {value}
                    </p>
                    {subText && (
                        <span className="text-sm text-gray-400">{subText}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
