import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

export function UserDetails({ user }) {
    return (
        <Card className="flex flex-col w-full lg:w-[50%] shadow-md rounded-lg">
            <CardHeader>
                <CardTitle className="text-lg font-semibold  py-2 px-2 shadow-sm">
                    Information zako
                </CardTitle>
            </CardHeader>
            <CardContent className="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <span className="font-semibold text-gray-600">Email:</span>
                    <div className="text-gray-800">
                        {" "}
                        {`${user.first_name} ${user.last_name}`}
                    </div>
                </div>
                <div>
                    <span className="font-semibold text-gray-600">Email:</span>
                    <div className="text-gray-800">{user.email}</div>
                </div>
                <div>
                    <span className="font-semibold text-gray-600">Phone:</span>
                    <div className="text-gray-800">{user.phone_number}</div>
                </div>
                <div>
                    <span className="font-semibold text-gray-600">Street:</span>
                    <div className="text-gray-800">
                        {!user.street ? "N/A" : user.street}
                    </div>
                </div>

                <div>
                    <span className="font-semibold text-gray-600">Target:</span>
                    <div className="text-gray-800">
                        {!user.target ? 0 : user.target}
                    </div>
                </div>
                <div>
                    <span className="font-semibold text-gray-600">
                        Control Number Target:
                    </span>
                    <div className="text-gray-800">
                        {!user.control_number_target
                            ? 0
                            : user.control_number_target}
                    </div>
                </div>
                <div>
                    <span className="font-semibold text-gray-600">Role:</span>
                    <div className="text-gray-800 capitalize">{user.role}</div>
                </div>
                <div>
                    <span className="font-semibold text-gray-600">Joined:</span>
                    <div className="text-gray-800">
                        {new Date(user.created_at).toLocaleDateString()}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex justify-end text-gray-500 text-sm">
                Last updated: {new Date().toLocaleDateString()}
            </CardFooter>
        </Card>
    );
}
