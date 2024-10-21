export default projectInfos => ({
  type: 'input',
  message: '💡  Project name',
  name: 'projectName',
  default: projectInfos.name
});
