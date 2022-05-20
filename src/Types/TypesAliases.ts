import { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react"

export type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export type InputButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type ButtonTypes = "button" | "submit" | "reset" | undefined

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export type SetAction<T> = Dispatch<SetStateAction<T>>

export type HTMLButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>