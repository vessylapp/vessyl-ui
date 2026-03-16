export default function PageHeader({ title, note, actions }) {
    return (
        <header className="page-header">
            <div>
                <h1 className="page-title">{title}</h1>
                {note ? <p className="page-note">{note}</p> : null}
            </div>
            {actions ? <div className="page-actions">{actions}</div> : null}
        </header>
    );
}
