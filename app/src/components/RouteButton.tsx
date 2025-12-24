import { route } from "preact-router";

function RouteButton({title, href}) {
    return (
        <button type="button" onClick={() => route(href)}>
            {title}
        </button>
    )
}

export default RouteButton;