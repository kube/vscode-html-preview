
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import {
  window,
  commands,
  workspace,
  ViewColumn,
  TextDocument,
  ExtensionContext,
  TextDocumentContentProvider
} from 'vscode'

const HTML_PREVIEW_SCHEME = 'html-preview'

const HTMLPreviewProvider: TextDocumentContentProvider = {
  provideTextDocumentContent: uri => {
    const document =
      workspace.textDocuments
        .find(document =>
          document.uri.fsPath === uri.fsPath
        )

    return document
      ? document.getText()
      : ''
  }
}

const getHTMLDocumentTitle = (document: TextDocument) => {
  const titleMatch =
    document.getText()
      .match(/<title>(.*)<\/title>/)

  if (window.activeTextEditor)
    window.activeTextEditor

  return titleMatch
    ? titleMatch[1]
    : 'Untitled'
}

const openDocumentHTMLPreview = (document: TextDocument) =>
  commands.executeCommand(
    'vscode.previewHtml',
    document.uri.with({
      scheme: HTML_PREVIEW_SCHEME
    }),
    ViewColumn.One,
    getHTMLDocumentTitle(document)
  )

const HTMLPreviewCommand = () => {
  if (window.activeTextEditor
    && window.activeTextEditor.document.languageId === 'html')
    openDocumentHTMLPreview(
      window.activeTextEditor.document
    )
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand(
      'htmlPreview.preview',
      HTMLPreviewCommand
    ),

    workspace.registerTextDocumentContentProvider(
      HTML_PREVIEW_SCHEME,
      HTMLPreviewProvider
    )
  )
}
