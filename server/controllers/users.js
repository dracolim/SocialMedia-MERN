import User from "../models/User";

/* READ */
export const getUser = async (req , re) => {
    try{
        const { id }  = req.params;
        const user = await User.findById(id);
        resizeBy.status(200).json(user);
    }
    catch(err) {
        resizeBy.status(404).json({message: err.message});
    }
}

export const getUserFriends = async (req, res => {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
        ({ _id , firstName , lastName , occupation , location, picturePath}) => {
            return {_id , firstName , lastName , occupation , location, picturePath};
        }
    )
})