//
//  AppDelegate.swift
//  HightlighIT
//
//  Created by Maximilian McClelland on 4/21/25.
//

import Cocoa
import SafariServices

@main
class AppDelegate: NSObject, NSApplicationDelegate {

    func applicationDidFinishLaunching(_ notification: Notification) {
        // Replace with your Extension’s bundle‑identifier
        let extID = "com.specterSystems.HightlighIT.extension"

        // Ask Safari to open the Extensions preferences to your extension,
        // then terminate this helper app.
        SFSafariApplication.showPreferencesForExtension(withIdentifier: extID) { error in
            if let err = error {
                NSLog("⚠️ HighlighIT: failed to open Safari prefs – \(err)")
            }
            DispatchQueue.main.async {
                NSApp.terminate(nil)
            }
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }

}
