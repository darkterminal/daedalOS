import type { ITerminalAddon, Terminal } from "xterm";

export type CommandInterpreter = (command?: string) => Promise<string>;

export type FitAddon = ITerminalAddon & { fit: () => void };

export type WebglAddon = ITerminalAddon & {
  dispose: () => void;
  onContextLoss: (callback: () => void) => void;
};

export type LocalEcho = ITerminalAddon & {
  _autocompleteHandlers: { fn: unknown }[];
  addAutocompleteHandler: (
    callback: (index: number, tokens: string[]) => string[]
  ) => void;
  handleCursorInsert: (text: string) => void;
  history: {
    entries: string[];
  };
  print: (message: string) => void;
  println: (message: string) => void;
  printWide: (message: string) => void;
  read: (prompt: string) => Promise<string>;
  removeAutocompleteHandler: (callback: unknown) => void;
};

export type OnKeyEvent = {
  domEvent: KeyboardEvent;
};

type LocalEchoOptions = {
  historySize?: number;
};

declare global {
  interface Window {
    Terminal?: typeof Terminal;
    FitAddon?: {
      FitAddon: new () => FitAddon;
    };
    WebglAddon?: {
      WebglAddon: new () => WebglAddon;
    };
    LocalEchoController?: new (
      terminal?: Terminal,
      options?: LocalEchoOptions
    ) => LocalEcho;
  }
}
