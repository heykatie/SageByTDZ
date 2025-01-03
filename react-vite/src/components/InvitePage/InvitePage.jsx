import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGroupInvites } from "../../redux/invites";


function GroupInvite({ invite }){

    return (
        <div>
            <p>{invite}</p>
        </div>
    )
}


function GroupInvites() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGroupInvites() )
    }, []);

    const invites = useSelector(state => state.invites);

    return (
        <div className="group-invite-container">
            {invites.map(invite => (
                <GroupInvite key={invite.id} invite={invite}/>
            ))}
        </div>
    )
}

export default GroupInvites