export default projectInfos => ({
  type: 'input',
  message: '👤  Author name',
  name: 'authorName',
  default: projectInfos.author
});
