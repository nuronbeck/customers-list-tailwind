import EyeIcon from './EyeIcon';
import EyeOffIcon from './EyeOffIcon';
import PensilIcon from './PensilIcon';
import TrashIcon from './TrashIcon';

const icons = {
  eye: <EyeIcon />,
  eyeOff: <EyeOffIcon />,
  pensil: <PensilIcon />,
  trash: <TrashIcon />,
};

interface IIcon {
  name: keyof typeof icons;
}

const Icon = ({ name }: IIcon) => {
  return icons[name];
};

export default Icon;
