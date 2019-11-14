// Set up tool for Quill API
 const toolbar = [
    [{ header: [1, 2, 3, 4, 5, , false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["clean"]
  ];
  
  // Set up editor
  let Delta = Quill.import("delta");
  let quill = new Quill("#editor", {
    modules: { toolbar: toolbar },
    theme: "snow",
    placeholder: "Write here..."
  });

  export { quill, Delta, toolbar };