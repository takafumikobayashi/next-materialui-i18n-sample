import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useTheme, makeStyles, Theme } from "@material-ui/core/styles";
import {
    Toolbar,
    Typography,
    AppBar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";

const useStyle = makeStyles({
    root: (props: Theme) => ({
        paddingTop: props.spacing(10),
        paddingLeft: props.spacing(5),
        paddingRight: props.spacing(5),
    })
});

const Homepage = () => {
    
    const router = useRouter()
    const { t } = useTranslation('common')
    
    const [ dialogOpen, setDialogOpen ] = useState(true);
    const classes = useStyle(useTheme());
    return (
        <div className={classes.root}>
        <Head>
            <title>My page title</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <Dialog open={dialogOpen} onClose={() => {setDialogOpen(false)}}>
            <DialogTitle>Dialog Sample</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Easy to use Material UI Dialog.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button
                color="primary"
                onClick={() => {setDialogOpen(false)}}
            >OK</Button>
            </DialogActions>
        </Dialog>
        <AppBar>
            <Toolbar>
            <Typography variant="h6" color="inherit">
                TypeScript + Next.js + Material UI Sample <div>{t('hello')}</div>
            </Typography>
            </Toolbar>
        </AppBar>
        <Typography variant="h1" gutterBottom={true}>
            Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
            {t('project-name')}
            <Link href='/' locale={router.locale === 'ja' ? 'en' : 'ja'}>
                <button>{t('change-locale')}</button>
            </Link>
        </Typography>
        <Typography gutterBottom={true}>
            <Link href="/about">
            <a>Go to the about page</a>
            </Link>
        </Typography>
        <Button
            variant="contained"
            color="secondary"
            onClick={() => { setDialogOpen(true)}}
        >Shot Dialog</Button>
        <style jsx={true}>{`
            .root {
            text-align: center;
            }
        `}</style>
        </div>
    );
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'footer']),
    },
})

export default Homepage