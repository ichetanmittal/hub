import {
  CreditCardIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
  PaperAirplaneIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

import configuration from '~/configuration';

type Divider = {
  divider: true;
};

type NavigationItemLink = {
  label: string;
  path: string;
  Icon: (props: { className: string }) => JSX.Element;
  end?: boolean;
};

type NavigationGroup = {
  label: string;
  collapsible?: boolean;
  collapsed?: boolean;
  children: NavigationItemLink[];
};

type NavigationItem = NavigationItemLink | NavigationGroup | Divider;

type NavigationConfig = {
  items: NavigationItem[];
};

const paths = configuration.paths.settings;

const NAVIGATION_CONFIG = (organization: string): NavigationConfig => ({
  items: [
    {
      label: 'common:dashboardTabLabel',
      path: getPath(organization, ''),
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
      end: true,
    },
    {
      label: 'Partnerships',
      path: getPath(organization, '/partnerships'),
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
      end: true,
    },
    {
      label: 'Jobs',
      path: getPath(organization, '/jobs'),
      Icon: ({ className }: { className: string }) => {
        return <BriefcaseIcon className={className} />;
      },
      end: true,
    },
    {
      label: 'Zones',
      path: getPath(organization, '/zones'),
      Icon: ({ className }: { className: string }) => {
        return <BriefcaseIcon className={className} />;
      },
      end: true,
    },
    {
      label: 'common:settingsTabLabel',
      collapsible: false,
      children: [
        {
          label: 'common:profileSettingsTabLabel',
          path: getPath(organization, paths.profile),
          Icon: ({ className }: { className: string }) => {
            return <UserIcon className={className} />;
          },
        },
        {
          label: 'common:organizationSettingsTabLabel',
          path: getPath(organization, paths.organization),
          Icon: ({ className }: { className: string }) => {
            return <UserGroupIcon className={className} />;
          },
        },
        {
          label: 'common:subscriptionSettingsTabLabel',
          path: getPath(organization, paths.subscription),
          Icon: ({ className }: { className: string }) => {
            return <CreditCardIcon className={className} />;
          },
        },
      ],
    },
  ],
});

export default NAVIGATION_CONFIG;

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;

  return [appPrefix, organizationId, path].filter(Boolean).join('/');
}
