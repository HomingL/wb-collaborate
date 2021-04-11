import { createStyles, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const WBLogo: React.FC = () => {
    const classes = useStyles();

    return (
        <Link href="/">
            <Typography variant="h6" className={classes.title}>
                Wb Collaborate
            </Typography>
        </Link>
    );
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default WBLogo;