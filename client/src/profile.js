import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";

export default function Profile({ first, last, profile_pic, bio, updateBio }) {
    return (
        <div className="profile">
            <h3>
                Hello my name is {first} {last}
            </h3>
            <ProfilePic profile_pic={profile_pic} />
            <BioEditor bio={bio} updateBio={updateBio} />
        </div>
    );
}
