import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import "./Home.css"
import { NoteType } from "../types/note";
import { API } from "aws-amplify";
import { onError } from "../lib/errorLib";
import { LinkContainer } from "react-router-bootstrap";
import { BsPencilSquare } from "react-icons/bs";

export default function Home(){
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const {isAuthenticated} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
            if(!isAuthenticated) {
                return;
            }

            try {
                const notes = await loadNotes();
                setNotes(notes);
            } catch (e) {
                onError(e);
            }
            setIsLoading(false);
        }

        onLoad();
    }, [isAuthenticated]);

    function loadNotes() {
        return API.get("Notes", "/notes", {});
    }

    function formatDate(str: undefined | string) {
        return !str ? "" : new Date(str).toLocaleString();
    }

    function renderNotesList(notes: NoteType[]) {
        return (
            <>
                <LinkContainer to="/notes/new">
                    <ListGroup.Item action className="py-3 text-nowrap text-truncate">
                        <BsPencilSquare size={17} />
                        <span className="ms-2 fw-bold"> Create a New Entry</span>
                    </ListGroup.Item>
                </LinkContainer>
                {notes.map(({ noteID, content, createdAt}) => (
                    <LinkContainer key={noteID} to={`/notes/${noteID}`}>
                        <ListGroup.Item action className="text-nowrap text-truncate">
                            <span className="fw-bold">{content.trim().split("\n")[0]}</span>
                            <br />
                            <span className="text-muted">
                                Created: {formatDate(createdAt)}
                            </span>
                        </ListGroup.Item>
                    </LinkContainer>
                ))}
            </>
        );
    }

    function renderLander() {
        return (
            
                <div className="lander">
                    <h1>Memento</h1>
                    <p className="text-muted">An advanced journaling app</p>
                </div>
            
        );
    }

    function renderNotes() {
        return (
        <div className="notes">
            <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Entries</h2>
            <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
        </div>
        );
    }

    return (
        <div className="Home">
            {isAuthenticated ? renderNotes() : renderLander()}
        </div>
    );
    
}