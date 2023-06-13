const {User, Thought, Reaction}=require('../models');

module.exports={

    async getUsers(req,res){
        try{
            const users=await User.find();
            res.json(users)
        }catch(err){
            res.status(500).json(err)
        }
    },
    async getSingleUser(req,res){
        try{
            const user=await User.findOne({_id: req.params.userId})
                .select('-__v')
                .populate(thoughts)
                .populate(friends)
                if(!user){
                    return res.status(404).json({message: 'No user with this id'})
                }
                res.json(user);
        }catch(err){
            res.status(500).json(err);
        }
    },
      // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    try {
      const friendList = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body._id } },
        { runValidators: true, new: true }
      );

      if (!friendList) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(friendList);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const removeFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { tagId: req.params.friendId } } },
        { runValidators: true, new: true }
      );

      if (!removeFriend) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(removeFriend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};




