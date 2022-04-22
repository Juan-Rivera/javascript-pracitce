/** @jsx h */

const ITEMS = "hello there people".split(" ");

// a simple JSX "view" with a call out ("partial") to generate a list from an Array:
let vdom = (
  <div id="foo">
    <p>Look, a simple JSX DOM renderer!</p>
    <p>{ITEMS}</p>
    <ul>{listItems(ITEMS)}</ul>
  </div>
);

// render() converts our "virtual DOM" (see below) to a real DOM tree:
let dom = render(vdom);

// append the new nodes somewhere:
document.body.appendChild(dom);

// Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
let json = JSON.stringify(vdom, null, "  ");

// The whole process (JSX -> VDOM -> DOM) in one step:
document.body.appendChild(render(<pre>{json}</pre>));

/* JSX Renderer FUNCTIONS */

function h(nodeName, attributes, ...args) {
  // Taking args array, expanding it into arguments (collapses potential nested arrays of child nodes)
  let children = args.length ? [].concat(...args) : null;
  return { nodeName, attributes, children };
}

function render(vnode) {
  // Convert strings to #text Nodes (if no nodeName or attributes is given)
  if (vnode.split) return document.createTextNode(vnode);

  // Create DOM element w/ nodeName
  let node = document.createElement(vnode.nodeName);

  // Copy attributes onto new node
  let attributes = vnode.attributes || {};
  Object.keys(attributes).forEach((key) =>
    node.setAttribute(key, attributes[key])
  );

  // Render (build) and append child nodes
  (vnode.children || []).forEach((child) => node.appendChild(render(child)));

  return node;
}

// a "partial" that does a filtered loop
function listItems(items) {
  return items.map((p) => <li> {p} </li>); // <-- can be multiline
}
